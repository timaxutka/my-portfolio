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

const Graph = ForceGraph()(document.getElementById('graph'))
    .graphData(myData)
    .width(container.offsetWidth)
    .height(container.offsetHeight)
    .backgroundColor('#000000')
    .enableNodeDrag(false)
    .minZoom(1)
    .maxZoom(5)

    // --- СЕТКА (Ч/Б) ---
    .onRenderFramePre((ctx, globalScale) => {
        const size = 50; 
        const range = 3000; 
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'; // Тускло-белая сетка
        ctx.lineWidth = 1 / globalScale; 
        for (let i = -range; i <= range; i += size) {
            ctx.moveTo(i, -range); ctx.lineTo(i, range);
            ctx.moveTo(-range, i); ctx.lineTo(range, i);
        }
        ctx.stroke();
        ctx.restore();
    })

    // --- ЛИНИИ (Белый пунктир) ---
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
        ctx.globalAlpha = 0.3; // Едва заметные линии
        ctx.stroke();
        ctx.restore();
    })

    // --- УЗЛЫ (Белые точки) ---
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 12/globalScale;
        
        ctx.save(); 
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3.5, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff'; // Чисто белый цвет
        ctx.fill();
        
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.font = `${fontSize}px Inter`;
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + 12);
        ctx.restore(); 
    })
    .onNodeClick(node => showModal(node));

// Настройка сил (Увеличенное расстояние)
Graph.d3Force('charge').strength(-400); // Сильнее отталкивание
Graph.d3Force('link').distance(100);    // Длиннее связи

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
    Graph.zoom(2, 1000);
    Graph.centerAt(0, 0, 1000);
});