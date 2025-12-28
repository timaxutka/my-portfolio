// 1. КОНСТАНТЫ И ДАННЫЕ (Объявляем в самом начале)
const glyphs = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789+=/-_";

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

// 2. ИНИЦИАЛИЗАЦИЯ ГРАФА
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

// 3. ЕДИНЫЙ ОБРАБОТЧИК МЫШИ (Курсор + Координаты + Параллакс + Граф)
const cursor = document.getElementById('custom-cursor');
const coords = document.getElementById('mouse-coords');
const photo = document.getElementById('parallax-photo');

document.addEventListener('mousemove', (e) => {
    // Двигаем кастомный курсор
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        const target = e.target;
        const isInteractive = target.closest('a, button, .skill-card, .nav-item, input, textarea');
        cursor.classList.toggle('active', !!isInteractive);
    }

    // Обновляем координаты
    if (coords) {
        const x = String(Math.floor(e.clientX)).padStart(3, '0');
        const y = String(Math.floor(e.clientY)).padStart(3, '0');
        coords.innerText = `X: ${x} Y: ${y}`;
    }

    // Обновляем позицию мыши для графа (только если мы внутри контейнера)
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        mousePos = Graph.screen2GraphCoords(e.clientX - rect.left, e.clientY - rect.top);
        Graph.resume();
    } else {
        mousePos = { x: null, y: null };
    }

    // Параллакс фото
    if (photo) {
        const px = (window.innerWidth - e.pageX * 2) / 100;
        const py = (window.innerHeight - e.pageY * 2) / 100;
        photo.style.transform = `translateX(${px}px) translateY(${py}px)`;
    }
});

// 4. МАГНИТНЫЕ КНОПКИ
document.querySelectorAll('.cta-btn, .project-link').forEach((el) => {
    el.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const moveX = (e.clientX - centerX) * 0.3;
        const moveY = (e.clientY - centerY) * 0.3;
        this.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
    el.addEventListener('mouseleave', function() {
        this.style.transform = `translate(0px, 0px)`;
    });
});

// 5. СКИЛЛЫ (Заполнение + Глитч)
function glitchPercent(el, target) {
    let current = 0;
    const duration = 1500; 
    const stepTime = Math.floor(duration / target);
    const interval = setInterval(() => {
        current++;
        const randomChar = Math.random() > 0.85 ? glyphs[Math.floor(Math.random() * glyphs.length)] : '';
        el.innerText = current + "%" + randomChar;
        if (current >= target) {
            clearInterval(interval);
            el.innerText = target + "%";
        }
    }, stepTime);
}

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Если уже анимировали, выходим
        if (this.dataset.animated === "true") return;
        this.dataset.animated = "true";

        // ДОБАВЛЯЕМ КЛАСС ДЛЯ CSS (чтобы проценты не исчезли)
        this.classList.add('filled');

        const progress = this.querySelector('.skill-progress');
        const valElement = this.querySelector('.skill-val');
        
        // Достаем процент
        const style = this.getAttribute('style');
        const match = style ? style.match(/--percent:\s*(\d+%)/) : null;
        
        if (match) {
            const targetPercent = match[1];
            const targetValue = parseInt(targetPercent);
            
            // Запускаем заполнение шкалы
            progress.style.height = targetPercent;
            
            // Запускаем глитч цифр
            glitchPercent(valElement, targetValue);
        }
    });
});

// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
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

function openContactForm() {
    document.getElementById('contact-drawer').classList.add('active');
    document.getElementById('drawer-overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeContactForm() {
    document.getElementById('contact-drawer').classList.remove('active');
    document.getElementById('drawer-overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function scramble(el, word) {
    let iteration = 0;
    const interval = setInterval(() => {
        el.innerText = word.split("").map((letter, index) => {
            if(index < iteration) return word[index];
            return glyphs[Math.floor(Math.random() * glyphs.length)];
        }).join("");
        if(iteration >= word.length) clearInterval(interval);
        iteration += 1 / 3;
    }, 30);
}

// 7. СОБЫТИЯ ЗАГРУЗКИ И РЕЗАЙЗА
window.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        scramble(heroTitle, "ПОРТФОЛИО");
        heroTitle.onmouseover = () => scramble(heroTitle, "DEVELOPER");
        heroTitle.onmouseleave = () => scramble(heroTitle, "ПОРТФОЛИО");
    }
});

window.addEventListener('resize', () => {
    Graph.width(container.offsetWidth);
    Graph.height(container.offsetHeight);
});

Graph.onEngineStop(() => {
    if (!Graph._initialZoomDone) {
        Graph.zoom(2.2, 1000);
        Graph.centerAt(0, 0, 1000);
        Graph._initialZoomDone = true;
    }
});