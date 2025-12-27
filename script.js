// 1. ДАННЫЕ (Теперь они живут здесь)
const myData = {
    nodes: [
        { id: 1, name: "Project Virus", type: "WebApp", desc: "Игра внутри Telegram.", link: "#" },
        { id: 2, name: "Virus Infographics", type: "Design", desc: "Оформление канала.", link: "#" },
        { id: 3, name: "Desktop Trading App", type: "Desktop", desc: "Приложение для трейдеров.", link: "#" },
        { id: 4, name: "Promo Landing", type: "Web", desc: "Лендинг для рекламы.", link: "#" }
    ],
    links: [
        { source: 1, target: 2 },
        { source: 1, target: 4 },
        { source: 3, target: 1 }
    ]
};

const container = document.getElementById('graph-container');

// 2. ИНИЦИАЛИЗАЦИЯ
const Graph = ForceGraph()
    (document.getElementById('graph'))
    .graphData(myData)
    .width(container.offsetWidth)
    .height(container.offsetHeight)
    .backgroundColor('#000000')
    
    // --- ПОВЕДЕНИЕ И ЗУМ ---
    .enableNodeDrag(false)
    // minZoom: насколько далеко можно отдалиться (0.5 - в два раза дальше базы)
    // maxZoom: насколько близко можно подойти (4 - очень близко)
    .minZoom(2) 
    .maxZoom(4)
    
    // --- ЛИНИИ (Переливание) ---
    // Отключаем частицы (Particles), так как они создают эффект паутины
    .linkDirectionalParticles(0) 
    // Делаем линии чуть толще и мягче
    .linkWidth(1.5)
    .linkColor(() => 'rgba(0, 255, 150, 0.2)') // Цвет в тон рамки, но полупрозрачный
    
    // Отрисовка узлов (оставляем твою красивую с Inter)
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 14/globalScale;
        ctx.font = `${fontSize}px Inter`;
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ff96';
        ctx.fillStyle = '#00ff96';
        
        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + 12);
    })
    .onNodeClick(node => showModal(node));

// --- ЦЕНТРИРОВАНИЕ И АВТО-ЗУМ ПРИ ЗАГРУЗКЕ ---
// Эта функция сработает, когда граф отрисуется, и "приблизит" камеру на нужный уровень
Graph.onEngineStop(() => {
    Graph.zoom(2.5, 1000); // Устанавливаем масштаб 2.5 (близко) плавно за 1 сек
    Graph.centerAt(0, 0, 1000); // Центрируем
});

// Физика (чуть меньше расталкивание, чтобы карта была компактнее)
Graph.d3Force('charge').strength(-100); 
Graph.d3Force('center').strength(0.1);