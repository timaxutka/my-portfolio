const myData = {
    nodes: [
        { id: 1, name: "Project Virus", date: "Октябрь 2023", desc: "Масштабная игра внутри Telegram с элементами стратегии.", link: "https://google.com" },
        { id: 2, name: "Virus Infographics", date: "Ноябрь 2023", desc: "Полный брендинг и оформление медиа-ресурсов.", link: "#" },
        { id: 3, name: "Desktop Trading App", date: "Январь 2024", desc: "Терминал для высокочастотной торговли.", link: "#" },
        { id: 4, name: "Promo Landing", date: "Февраль 2024", desc: "Высококонверсионная посадочная страница.", link: "#" }
    ],
    links: [
        { source: 1, target: 2 },
        { source: 1, target: 4 },
        { source: 3, target: 1 }
    ]
};

const container = document.getElementById('graph-container');
let dashOffset = 0;
let mousePos = { x: null, y: null };

const Graph = ForceGraph()(document.getElementById('graph'))
    .graphData(myData)
    .width(container.offsetWidth)
    .height(container.offsetHeight)
    .backgroundColor('#000000')
    .enableNodeDrag(false)
    .minZoom(1)
    .maxZoom(5)

    // --- СЕТКА ---
    .onRenderFramePre((ctx, globalScale) => {
        const size = 50; 
        const range = 3000; 
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1 / globalScale; 
        for (let i = -range; i <= range; i += size) {
            ctx.moveTo(i, -range); ctx.lineTo(i, range);
            ctx.moveTo(-range, i); ctx.lineTo(range, i);
        }
        ctx.stroke();
        ctx.restore();
    })

    // --- ЛИНИИ ---
    .linkCanvasObject((link, ctx) => {
        const start = link.source;
        const end = link.target;
        if (typeof start !== 'object' || typeof end !== 'object') return;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = '#fff'; 
        ctx.lineWidth = 0.2; 
        ctx.setLineDash([30, 90]); 
        ctx.lineDashOffset = -dashOffset;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.globalAlpha = 0.2; 
        ctx.stroke();
        ctx.restore();
    })

    // --- УЗЛЫ С ЭФФЕКТОМ "ТОЧЕЧНЫЙ РЫБИЙ ГЛАЗ" ---
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        
        // 1. Расчет дистанции до курсора
        let dist = 10000;
        if (mousePos.x !== null) {
            const dx = node.x - mousePos.x;
            const dy = node.y - mousePos.y;
            dist = Math.sqrt(dx*dx + dy*dy);
        }

        // 2. Параметры точечной линзы
        // Уменьшаем порог до 40px (было 80), чтобы эффект был локальным
        const threshold = 50; 
        const maxScale = 1.2; 
        
        // Математика экспоненциального роста (чтобы всплывало резко в конце)
        let magnification = 1;
        if (dist < threshold) {
            // Используем степень 2 для более "острого" эффекта в центре
            const power = Math.pow((threshold - dist) / threshold, 2);
            magnification = 1 + (maxScale - 1) * power;
        }
        
        const baseRadius = 3.5;
        const radius = baseRadius * magnification;
        const fontSize = (12 * magnification) / globalScale;

        ctx.save(); 
        
        // Рисуем точку
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        
        // Цвет: узел становится белым только при близком наведении
        ctx.fillStyle = magnification > 1.4 ? '#fff' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        
        // Название проекта: проявляется только под линзой
        const alpha = magnification > 1.1 ? 1 : 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = `${magnification > 1.2 ? 'bold' : 'normal'} ${fontSize}px Inter`;
        ctx.textAlign = 'center';
        
        // Смещение текста учитывает новый радиус
        ctx.fillText(label, node.x, node.y + radius + (16 / globalScale));
        
        ctx.restore(); 
    })
    .onNodeClick(node => showModal(node));

// Отслеживание мыши
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mousePos = Graph.screen2GraphCoords(e.clientX - rect.left, e.clientY - rect.top);
});
container.addEventListener('mouseleave', () => {
    mousePos = { x: null, y: null };
});

// Настройки сил
Graph.d3Force('charge').strength(-250);
Graph.d3Force('link').distance(70);

function showModal(node) {
    const modal = document.getElementById('modal');
    document.getElementById('m-title').innerText = node.name;
    document.getElementById('m-date').innerText = `Срок: ${node.date}`;
    document.getElementById('m-desc').innerText = node.desc;
    document.getElementById('m-link').href = node.link;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
}

function animate() {
    dashOffset += 0.3; 
    requestAnimationFrame(animate);
}
animate();

Graph.onEngineStop(() => {
    Graph.zoom(2.2, 1000);
    Graph.centerAt(0, 0, 1000);
});