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

// ВАЖНО: Цепляемся к блоку внутри сглаженного контейнера
const container = document.getElementById('graph-container');
const graphDiv = document.getElementById('graph');

let dashOffset = 0;
let mousePos = { x: null, y: null };

const Graph = ForceGraph()(graphDiv)
    .graphData(myData)
    .width(container.offsetWidth)
    .height(container.offsetHeight)
    .backgroundColor('#000000')
    .enableNodeDrag(false)
    .minZoom(1)
    .maxZoom(5)
    .cooldownTicks(1000000)
    .cooldownTime(600000)
    .onRenderFramePre((ctx, globalScale) => {
        dashOffset += 0.3;
        const size = 50; const range = 3000;
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
    .linkCanvasObject((link, ctx) => {
        const start = link.source; const end = link.target;
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
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        let dist = 10000;
        if (mousePos.x !== null) {
            const dx = node.x - mousePos.x; const dy = node.y - mousePos.y;
            dist = Math.sqrt(dx*dx + dy*dy);
        }
        const threshold = 50; const maxScale = 1.2; 
        let magnification = 1;
        if (dist < threshold) {
            const power = Math.pow((threshold - dist) / threshold, 2);
            magnification = 1 + (maxScale - 1) * power;
        }
        const baseRadius = 3.5;
        const radius = baseRadius * magnification;
        const fontSize = (12 * magnification) / globalScale;
        ctx.save(); 
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = magnification > 1.05 ? '#fff' : 'rgba(255, 255, 255, 0.4)';
        ctx.fill();
        const alpha = magnification > 1.1 ? 1 : 0.3;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = `${magnification > 1.1 ? 'bold' : 'normal'} ${fontSize}px 'JetBrains Mono'`;
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + radius + (16 / globalScale));
        ctx.restore(); 
    })
    .onNodeClick(node => {
        showModal(node);
        Graph.zoom(4, 1000);
        Graph.centerAt(node.x, node.y, 1000);
    });

container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mousePos = Graph.screen2GraphCoords(e.clientX - rect.left, e.clientY - rect.top);
    Graph.resume(); 
});

container.addEventListener('mouseleave', () => { mousePos = { x: null, y: null }; });

Graph.d3Force('charge').strength(-250);
Graph.d3Force('link').distance(70);

function showModal(node) {
    const modal = document.getElementById('project-modal');
    document.getElementById('m-title').innerText = node.name;
    document.getElementById('m-date').innerText = `Срок: ${node.date}`;
    document.getElementById('m-desc').innerText = node.desc;
    document.getElementById('m-link').href = node.link;
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('project-modal').classList.remove('active');
}

Graph.onEngineStop(() => {
    if (!Graph._initialZoomDone) {
        Graph.zoom(2.2, 1000);
        Graph.centerAt(0, 0, 1000);
        Graph._initialZoomDone = true;
    }
});

const observerOptions = {
    threshold: 0.2 // Анимация начнется, когда 20% сетки будет видно
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.skill-card');
            
            cards.forEach((card, index) => {
                const progress = card.querySelector('.skill-progress');
                const style = card.getAttribute('style');
                
                if (style) {
                    const match = style.match(/--percent:\s*(\d+%)/);
                    if (match) {
                        const targetHeight = match[1];
                        // Добавляем небольшую задержку для каждой следующей карточки (эффект лесенки)
                        setTimeout(() => {
                            progress.style.height = targetHeight;
                        }, index * 100); 
                    }
                }
            });
            // Выключаем наблюдение после того, как анимация один раз проигралась
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Начинаем следить за сеткой
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skillObserver.observe(skillsGrid);
}