// 1. КОНСТАНТЫ И ДАННЫЕ (Объявляем в самом начале)
const glyphs = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789+=/-_";

const myData = {
    nodes: [
        { id: 1, name: "Project Virus", date: "Октябрь 2023", problem: "Низкое удержание игроков...", solution: "Внедрение системы захвата...", result: "Retention вырос до 18%...", link: "https://google.com" },
        { id: 2, name: "Virus Infographics", date: "Ноябрь 2023", problem: "Сложные данные...", solution: "Интерактивные гайды...", result: "Снижение обращений на 35%...", link: "#" },
        { id: 3, name: "Desktop Trading App", date: "Январь 2024", problem: "Высокая задержка...", solution: "WebGL оптимизация...", result: "Стабильные 60 FPS...", link: "#" },
        { id: 4, name: "Promo Landing", date: "Февраль 2024", problem: "Низкая конверсия...", solution: "Минимализм и CTA...", result: "Конверсия выросла до 8.4%...", link: "#" },
        { id: 5, name: "Neural Nexus AI", date: "Март 2024", problem: "Долгий поиск инфо...", solution: "LLM-ассистент...", result: "Поиск: 4 мин -> 15 сек...", link: "#" },
        { id: 6, name: "Crypto Wallet UI", date: "Апрель 2024", problem: "Ошибки транзакций...", solution: "UX-визуализация пути...", result: "Ошибки снизились на 60%...", link: "#" },
        { id: 7, name: "E-com Dashboard", date: "Июнь 2024", problem: "Слепые зоны прибыли...", solution: "Сквозная аналитика...", result: "ROI вырос на 22%...", link: "#" },
        { id: 8, name: "Security Audit Tool", date: "Август 2024", problem: "Долгий ручной аудит...", solution: "Статический анализатор...", result: "Ускорение в 3 раза...", link: "#" },
        { id: 9, name: "VFX Portfolio", date: "Сентябрь 2024", problem: "Тяжелое видео...", solution: "Self-hosted адаптив...", result: "Плавное 4K везде...", link: "#" },
        { id: 10, name: "Mobile CRM System", date: "Ноябрь 2024", problem: "Потеря данных в полях...", solution: "Offline-first PWA...", result: "Отчетность: 70% -> 98%...", link: "#" }
    ],
    links: [
        // КЛАСТЕР 1: Игровая экосистема (1, 2, 4)
        { source: 1, target: 2 },
        { source: 2, target: 4 },
        { source: 4, target: 1 },

        // КЛАСТЕР 2: Финтех и Инструменты (3, 6, 8)
        { source: 3, target: 6 },
        { source: 6, target: 8 },
        { source: 8, target: 3 },

        // КЛАСТЕР 3: AI и Бизнес-системы (5, 7, 10)
        { source: 5, target: 10 },
        { source: 10, target: 7 },
        { source: 7, target: 5 },

        // МОСТИК (Слабая связь, чтобы группы не разлетались слишком далеко)
        { source: 4, target: 7 }, 
        
        // ОДИНОЧНЫЙ УЗЕЛ (9 - VFX Portfolio) 
        // Он будет висеть отдельно, так как у него только одна связь
        { source: 9, target: 2 }
    ]
};

const terminalLines = [
    "> INITIALIZING INTERFACE...",
    "> LOADING PROJECT_ECOSYSTEM...",
    "> CONNECTING TO NEURAL_NODES...",
    "> STATUS: OPTIMAL",
    "> WELCOME, USER"
];

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
    .cooldownTime(600000) // Твой стандарт рендера (10 минут) не меняем
    .onRenderFramePre((ctx, globalScale) => {
        // Оставляем сетку как есть
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
        const start = link.source;
        const end = link.target;
        if (typeof start !== 'object' || typeof end !== 'object') return;

        const baseRadius = 4; // Должен совпадать с радиусом из nodeCanvasObject

        // Вычисляем расстояние между центрами
        const dx = end.x - start.x;
        const dy = end.y - start.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist === 0) return;

        // Вычисляем смещение (нормализованный вектор * радиус)
        const offsetX = (dx / dist) * baseRadius;
        const offsetY = (dy / dist) * baseRadius;

        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.lineWidth = 0.5;

        // Рисуем линию от края первого узла до края второго
        ctx.moveTo(start.x + offsetX, start.y + offsetY);
        ctx.lineTo(end.x - offsetX, end.y - offsetY);

        ctx.stroke();
        ctx.restore();
    })
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        const isHovered = mousePos.x !== null && Math.sqrt(Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2)) < 15;
        
        const baseRadius = 4;
        // 1. АНИМАЦИЯ ДЫХАНИЯ: Используем время для плавного изменения размера
        const t = Date.now() / 1000;
        const breathe = Math.sin(t * 2) * 0.5; // Колебания +- 0.5px
        const radius = (isHovered ? baseRadius * 1.2 : baseRadius) + breathe;
        
        const fontSize = 12 / globalScale;

        ctx.save();
        
        // 2. ПУЛЬСИРУЮЩАЯ АУРА (только для обычного состояния, чтобы не пестрило)
        if (!isHovered) {
            const pulse = (Date.now() / 1500) % 1; // Цикл от 0 до 1
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + (pulse * 6), 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - pulse)})`;
            ctx.lineWidth = 0.5 / globalScale;
            ctx.stroke();
        }

        // ОСНОВНОЙ УЗЕЛ
        if (isHovered) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(255, 255, 255, 0.8)";
            ctx.fillStyle = "#ffffff";
        } else {
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.5 / globalScale;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        
        if (isHovered) {
            ctx.fill(); 
        } else {
            ctx.stroke();
            // Маленькая точка в центре для "технологичности"
            ctx.beginPath();
            ctx.arc(node.x, node.y, 1 / globalScale, 0, 2 * Math.PI);
            ctx.fillStyle = "#ffffff";
            ctx.fill();
        }

        // ТЕКСТ
        const alpha = isHovered ? 1 : 0.4;
        ctx.shadowBlur = 0;
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
        ctx.font = `${isHovered ? 'bold' : 'normal'} ${fontSize}px 'JetBrains Mono'`;
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, node.y + radius + (16 / globalScale));
        
        ctx.restore();
    })
    .onNodeClick(node => {
        // При клике открываем модалку и центрируем (нажатый узел уже подсвечен через логику выше)
        showModal(node);
        Graph.zoom(4, 1000);
        Graph.centerAt(node.x, node.y, 1000);
    });

// 3. ЕДИНЫЙ ОБРАБОТЧИК МЫШИ (Курсор + Координаты + Параллакс + Граф)
const cursor = document.getElementById('custom-cursor');
const coords = document.getElementById('mouse-coords');
const photo = document.getElementById('parallax-photo');

window.addEventListener('pointermove', (e) => {
    // 1. Двигаем кастомный курсор
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        // Используем elementFromPoint, чтобы корректно определять цели во время драга
        const target = e.target;
        const isInteractive = target.closest('a, button, .skill-card, .nav-item, input, textarea, .project-link');
        cursor.classList.toggle('active', !!isInteractive);
    }

    // 2. Обновляем координаты (с твоим форматированием)
    if (coords) {
        const x = String(Math.floor(e.clientX)).padStart(3, '0');
        const y = String(Math.floor(e.clientY)).padStart(3, '0');
        coords.innerText = `X: ${x} Y: ${y}`;
    }

    // 3. Обновляем позицию мыши для графа
    const rect = container.getBoundingClientRect();
    if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
        // Вычисляем координаты внутри контейнера графа
        const graphX = e.clientX - rect.left;
        const graphY = e.clientY - rect.top;
        
        mousePos = Graph.screen2GraphCoords(graphX, graphY);
        Graph.resume(); // Продолжаем симуляцию, чтобы узлы реагировали
    } else {
        mousePos = { x: null, y: null };
    }

    // 4. Параллакс фото (используем clientX/Y для стабильности)
    if (photo) {
        const px = (window.innerWidth - e.clientX * 2) / 100;
        const py = (window.innerHeight - e.clientY * 2) / 100;
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
    const overlay = document.getElementById('drawer-overlay');
    
    // Заполняем данные
    document.getElementById('m-title').innerText = node.name || "Project";
    document.getElementById('m-problem').innerText = node.problem || "—";
    document.getElementById('m-solution').innerText = node.solution || "—";
    document.getElementById('m-result').innerText = node.result || "—";
    
    // Подставляем дату (если её нет в объекте, пишем текущую или заглушку)
    document.getElementById('m-date').innerText = node.date || "DATE: 2024 / Q4";
    
    const linkBtn = document.getElementById('m-link');
    if (node.link) {
        linkBtn.href = node.link;
        linkBtn.style.display = "inline-block";
    } else {
        linkBtn.style.display = "none";
    }
    
    modal.classList.add('active');
    overlay.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    const overlay = document.getElementById('drawer-overlay');
    
    modal.classList.remove('active');
    if (overlay) overlay.style.display = 'none';
}

// Закрытие при клике на блюр (оверлей)
const overlay = document.getElementById('drawer-overlay');
if (overlay) {
    overlay.addEventListener('click', () => {
        closeModal();
        if (typeof closeContactForm === 'function') closeContactForm(); // На случай если форма тоже открыта
    });
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
        scramble(heroTitle, "PORTFOLIO");
        heroTitle.onmouseover = () => scramble(heroTitle, "UX/UI DES");
        heroTitle.onmouseleave = () => scramble(heroTitle, "PORTFOLIO");
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

// Логика индикатора прокрутки
window.addEventListener('scroll', () => {
    // Вычисляем, на сколько пикселей прокручена страница
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    
    // Вычисляем общую доступную высоту прокрутки
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Переводим в проценты
    const scrolled = (winScroll / height) * 100;
    
    // Применяем ширину к линии
    const progressBar = document.getElementById('scroll-progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + "%";
    }
});

function startTerminal() {
    const container = document.getElementById('terminal-content');
    let lineIndex = 0;

    function addLine() {
        if (lineIndex < terminalLines.length) {
            const div = document.createElement('div');
            div.className = 'terminal-line active';
            div.innerText = terminalLines[lineIndex];
            container.appendChild(div);

            // Когда анимация печати строки закончится (через 1 сек)
            setTimeout(() => {
                div.classList.remove('active');
                div.classList.add('done');
                lineIndex++;
                // Небольшая пауза перед следующей строкой
                setTimeout(addLine, 200);
            }, 1000);
        } else {
            // Когда все строки напечатаны, скрываем терминал
            setTimeout(() => {
                const loader = document.getElementById('terminal-loader');
                loader.style.transition = 'opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s ease';
                loader.style.opacity = '0';
                loader.style.transform = 'scale(1.1)'; // Эффект легкого зума при исчезновении
                
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }, 800);
        }
    }

    addLine();
}

// Запускаем при полной загрузке страницы
window.addEventListener('load', startTerminal);

function updateHUDTime() {
    const timeElement = document.getElementById('hud-time');
    if (timeElement) {
        const now = new Date();
        // Смещение для Омска (GMT+6)
        const offset = 6; 
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const omskTime = new Date(utc + (3600000 * offset));
        
        const h = String(omskTime.getHours()).padStart(2, '0');
        const m = String(omskTime.getMinutes()).padStart(2, '0');
        const s = String(omskTime.getSeconds()).padStart(2, '0');
        
        timeElement.innerText = `TIME: (GMT+6) ${h}:${m}:${s}`;
    }
}
setInterval(updateHUDTime, 1000);
updateHUDTime(); // Инициализация сразу

document.addEventListener('DOMContentLoaded', () => {
    const jokes = [
        "// Осторожно: код содержит следы магии и костылей.",
        "// 404: Смысл жизни не найден. Листайте дальше.",
        "// Сделано в Омске. Да, мы все еще тут.",
        "// Пиксели ручной работы. Ни одного нейрона не пострадало.",
        "// Работает? Не трогай.",
        "// Сварено на кофе и бессоннице.",
        "// Весь этот сайт — это один большой div.",
        "// 100% Organic Code. No GMO.",
        "// Пожалуйста, не смотрите в исходный код. Там страшно.",
        "// Ctrl+C, Ctrl+V — мои лучшие друзья.",
        "// Этот текст был сгенерирован в 3 часа ночи."
    ];

    const jokeElement = document.getElementById('random-joke');
    const regenBtn = document.getElementById('regen-btn');
    const yearElement = document.getElementById('footer-year');

    function updateJoke() {
        // Добавляем эффект "лага" при смене
        jokeElement.style.opacity = 0;
        setTimeout(() => {
            const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
            jokeElement.innerText = randomJoke;
            jokeElement.style.opacity = 1;
        }, 150);
    }

    if (regenBtn) {
        regenBtn.addEventListener('click', updateJoke);
    }

    // Инициализация
    updateJoke();

    if (yearElement) {
        yearElement.innerText = new Date().getFullYear();
    }
});

// БЕЗОПАСНЫЙ ДРЕЙФ КАМЕРЫ
let angle = 0;
function animateCamera() {
    if (!mousePos.x) { // Двигаем только когда юзер не водит по графу
        angle += 0.0008;
        const shiftX = Math.sin(angle) * 0.15;
        const shiftY = Math.cos(angle) * 0.15;
        const center = Graph.centerAt();
        Graph.centerAt(center.x + shiftX, center.y + shiftY);
    }
    requestAnimationFrame(animateCamera);
}

// Запускаем через пару секунд после старта, чтобы всё прогрузилось
setTimeout(animateCamera, 3000);