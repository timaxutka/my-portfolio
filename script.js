// 1. КОНСТАНТЫ И ДАННЫЕ (Объявляем в самом начале)
const glyphs = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789+=/-_";

const myData = {
    nodes: [
        // КЛАСТЕР 1: Геймдев и Промо
        { 
            id: 1, name: "Project Virus", date: "Октябрь 2023", 
            img: "img/projects/1.png",
            product: "WebGL Game", role: "Solo Dev / UX", timeline: "3 Weeks",
            problem: "Низкое удержание игроков на уровне обучения (отвал 40%).", 
            solution: "Редизайн туториала через динамический UI и систему быстрых наград.", 
            result: "Retention D1 вырос до 18%, время первой сессии +12%.", 
            link: "https://google.com" 
        },
        { 
            id: 2, name: "Virus Infographics", date: "Ноябрь 2023", 
            img: "img/projects/2.webp",
            product: "EdTech Dashboard", role: "UI/UX Designer", timeline: "10 Days",
            problem: "Пользователи не считывали иерархию данных в сложных графиках.", 
            solution: "Интерактивная визуализация слоев с фильтрацией по клику на узел.", 
            result: "Снижение обращений в саппорт на 35%.", 
            link: "#" 
        },
        { 
            id: 4, name: "Promo Landing", date: "Февраль 2024", 
            img: "img/projects/4.webp",
            product: "Marketing Page", role: "Lead UI", timeline: "1 Week",
            problem: "Высокий показатель отказов на первом экране (Bounce Rate 70%).", 
            solution: "Внедрение скролл-анимаций и четкого Value Proposition.", 
            result: "Конверсия в целевое действие выросла до 8.4%.", 
            link: "#" 
        },
        { 
            id: 9, name: "VFX Portfolio", date: "Сентябрь 2024", 
            img: "img/projects/9.webp",
            product: "Video Showcase", role: "Frontend Dev", timeline: "12 Days",
            problem: "Тяжелый видео-контент тормозил загрузку на мобильных устройствах.", 
            solution: "Self-hosted адаптивный плеер с ленивой загрузкой чанков.", 
            result: "Плавное 4K воспроизведение, PageSpeed Score 95+.", 
            link: "#" 
        },
        // КЛАСТЕР 2: Финтех и Инструменты
        { 
            id: 3, name: "Desktop Trading App", date: "Январь 2024", 
            img: "img/projects/3.webp",
            product: "Trading Terminal", role: "UX/UI / Analyst", timeline: "1 Month",
            problem: "Задержка отображения свечей приводила к ошибкам трейдеров.", 
            solution: "Оптимизация рендеринга через WebGL и буферизацию данных.", 
            result: "Стабильные 60 FPS при 1000+ активных объектов.", 
            link: "#" 
        },
        { 
            id: 6, name: "Crypto Wallet UI", date: "Апрель 2024", 
            img: "img/projects/6.webp",
            product: "Mobile App", role: "UX Researcher", timeline: "3 Weeks",
            problem: "Пользователи путали сети (BSC/ETH) и теряли транзакции.", 
            solution: "Визуальное разделение путей через цветовые мосты.", 
            result: "Количество ошибочных транзакций снизилось на 60%.", 
            link: "#" 
        },
        { 
            id: 8, name: "Security Audit Tool", date: "Август 2024", 
            img: "img/projects/8.webp",
            product: "Cybersecurity B2B", role: "Fullstack / UX", timeline: "5 Weeks",
            problem: "Ручной аудит безопасности занимал 48+ часов.", 
            solution: "Автоматизация через статический анализатор логов.", 
            result: "Ускорение процесса аудита в 3 раза.", 
            link: "#" 
        },
        // КЛАСТЕР 3: AI и Бизнес-системы
        { 
            id: 5, name: "Neural Nexus AI", date: "Март 2024", 
            img: "img/projects/5.webp",
            product: "LLM Interface", role: "Product Designer", timeline: "4 Weeks",
            problem: "Сложность формирования промптов для сотрудников.", 
            solution: "Система умных подсказок и библиотека шаблонов.", 
            result: "Поиск и генерация ответа: 4 мин -> 15 сек.", 
            link: "#" 
        },
        { 
            id: 7, name: "E-com Dashboard", date: "Июнь 2024", 
            img: "img/projects/7.webp",
            product: "Analytics SaaS", role: "BI Analyst", timeline: "1 Month",
            problem: "Нет связи между рекламным бюджетом и возвратом товара.", 
            solution: "Сквозная аналитика с кастомными дашбордами прибыли.", 
            result: "ROI рекламных кампаний вырос на 22%.", 
            link: "#" 
        },
        { 
            id: 10, name: "Mobile CRM System", date: "Ноябрь 2024", 
            img: "img/projects/10.webp",
            product: "Enterprise PWA", role: "Solo Developer", timeline: "6 Weeks",
            problem: "Потеря данных при работе в зонах без интернета.", 
            solution: "Offline-first архитектура с фоновой синхронизацией.", 
            result: "Полнота отчетности выросла с 70% до 98.5%.", 
            link: "#" 
        }
    ],
    links: [
        { source: 1, target: 2 }, { source: 2, target: 4 }, { source: 4, target: 1 },
        { source: 3, target: 6 }, { source: 6, target: 8 }, { source: 8, target: 3 },
        { source: 5, target: 10 }, { source: 10, target: 7 }, { source: 7, target: 5 },
        { source: 4, target: 7 }, { source: 9, target: 2 }
    ]
};

const terminalLines = [
    "> INITIALIZING INTERFACE...",
    "> LOADING PROJECT_ECOSYSTEM...",
    "> CONNECTING TO NEURAL_NODES...",
    "> STATUS: OPTIMAL",
    "> WELCOME, USER"
];

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
    .enableNodeDrag(true)
    .minZoom(1)
    .maxZoom(5)
    .cooldownTicks(1000000)
    .cooldownTime(600000) // Твой стандарт рендера (10 минут) не меняем
    .onNodeDrag((node, translate) => {
        // При перетягивании отключаем дрейф камеры, чтобы не дергалось
        mousePos.x = node.x; 
        
        // Фиксируем узел в позиции мыши, чтобы он не "уплывал" обратно под силами графа
        node.fx = node.x;
        node.fy = node.y;
    })
    .onNodeDragEnd(node => {
        // Оставляем узел зафиксированным там, куда его бросили
        // Если хочешь, чтобы он улетал обратно, напиши: node.fx = null; node.fy = null;
        node.fx = node.x;
        node.fy = node.y;
    })
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
            const pulse = (Date.now() / 1000) % 1; // Цикл от 0 до 1
            ctx.beginPath();
            ctx.arc(node.x, node.y, radius + (pulse * 6), 0, 2 * Math.PI);
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - pulse)})`;
            ctx.lineWidth = 0.5 / globalScale;
            ctx.stroke();
        }

        // ОСНОВНОЙ УЗЕЛ
        if (isHovered) {
            ctx.shadowBlur = 15;
            ctx.shadowColor = "rgba(255, 255, 255)";
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



// 4. УНИВЕРСАЛЬНЫЙ МАГНИТ
function initMagnets() {
    // Ищем все интерактивные элементы
    const magneticElements = document.querySelectorAll('.cta-btn, .project-link, .back-btn');
    
    magneticElements.forEach((el) => {
        // Очищаем старые слушатели, чтобы не было конфликтов
        el.onmousemove = function(e) {
            const rect = this.getBoundingClientRect();
            // Расчет центра
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            // Сила магнита (0.3)
            const moveX = (e.clientX - centerX) * 0.3;
            const moveY = (e.clientY - centerY) * 0.3;
            
            this.style.transform = `translate(${moveX}px, ${moveY}px)`;
            this.style.transition = "transform 0.1s ease-out"; // Быстрый отклик
        };

        el.onmouseleave = function() {
            this.style.transform = `translate(0px, 0px)`;
            this.style.transition = "transform 0.5s ease-out"; // Плавный возврат
        };
    });
}

// Запускаем сразу
initMagnets();

// И ПОВТОРНО запускаем через секунду (на случай, если карточки подгрузились позже)
setTimeout(initMagnets, 1000);

// 5. СКИЛЛЫ (Заполнение + Глитч)
function glitchPercent(valElement, target, statusText) {
    let current = 0;
    const duration = 1500; 
    const stepTime = Math.floor(duration / target);
    
    // Создаем структуру внутри: один span для цифр, другой для статуса
    valElement.innerHTML = `<span class="num-part">0%</span><span class="status-part">${statusText}</span>`;
    const numSpan = valElement.querySelector('.num-part');

    const interval = setInterval(() => {
        current++;
        const randomChar = Math.random() > 0.85 ? glyphs[Math.floor(Math.random() * glyphs.length)] : '';
        numSpan.innerText = current + "%" + randomChar;
        
        if (current >= target) {
            clearInterval(interval);
            numSpan.innerText = target + "%";
        }
    }, stepTime);
}

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (this.dataset.animated === "true") return;
        this.dataset.animated = "true";
        this.classList.add('filled');

        const progress = this.querySelector('.skill-progress');
        const valElement = this.querySelector('.skill-val');
        
        // Сохраняем "БАЗА" или "ПРОДВИНУТЫЙ" перед тем как JS начнет глитчить
        const statusText = valElement.innerText; 

        const style = this.getAttribute('style');
        const match = style ? style.match(/--percent:\s*(\d+)%/) : null;
        
        if (match) {
            const targetValue = parseInt(match[1]);
            progress.style.height = targetValue + "%";
            // Передаем статус в функцию глитча
            glitchPercent(valElement, targetValue, statusText);
        }
    });
});

// 6. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function showModal(node) {
    const modal = document.getElementById('project-modal');
    const overlay = document.getElementById('drawer-overlay');
    const imgElement = document.getElementById('m-img');

    // Заполнение текста
    document.getElementById('m-title').innerText = node.name;
    document.getElementById('m-product').innerText = node.product;
    document.getElementById('m-role').innerText = node.role;
    document.getElementById('m-timeline').innerText = node.timeline;
    document.getElementById('m-problem').innerText = node.problem;
    document.getElementById('m-solution').innerText = node.solution;
    document.getElementById('m-result').innerText = node.result;
    document.getElementById('m-date').innerText = node.date;

    // Подстановка изображения
    if (node.img) {
        imgElement.src = node.img;
        imgElement.parentElement.style.display = "flex"; // Показываем контейнер
    } else {
        imgElement.parentElement.style.display = "none"; // Прячем, если нет фото
    }

    // Ссылка
    const linkBtn = document.getElementById('m-link');
    if (node.link && node.link !== "#") {
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
        const shiftX = Math.sin(angle) * 0.05;
        const shiftY = Math.cos(angle) * 0.05;
        const center = Graph.centerAt();
        Graph.centerAt(center.x + shiftX, center.y + shiftY);
    }
    requestAnimationFrame(animateCamera);
}

// Запускаем через пару секунд после старта, чтобы всё прогрузилось
setTimeout(animateCamera, 3000);

document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('click', function() {
        if (window.innerWidth <= 768) {
            // Если карточка уже открыта — закрываем
            if (this.classList.contains('is-tapped')) {
                this.classList.remove('is-tapped');
            } else {
                // Закрываем все остальные, чтобы не было каши
                document.querySelectorAll('.skill-card').forEach(c => c.classList.remove('is-tapped'));
                // Открываем текущую
                this.classList.add('is-tapped');
            }
        }
    });
});

const canvas = document.getElementById('businessChart');
const ctx = canvas.getContext('2d');

let offset = 0; 

// 1. ДИНАМИЧЕСКАЯ ЗАЛИВКА (подстраивается под высоту мобилки/пк)
function getAreaGradient(chart) {
    const {ctx, chartArea} = chart;
    if (!chartArea) return null;

    // Градиент от верхней точки контента до нижней точки контента
    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
    gradient.addColorStop(0, 'rgba(155, 17, 30, 0.25)'); // Твой красный сверху
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');        // Уходит в ноль строго внизу
    return gradient;
}

// 2. БЕГУЩИЙ ИМПУЛЬС (на самой линии)
function getMovingGradient(chart) {
    const {ctx, chartArea} = chart;
    if (!chartArea) return;

    // Широкий световой сгусток (300px)
    const gradient = ctx.createLinearGradient(chartArea.left + offset, 0, chartArea.left + offset - 300, 0);
    
    gradient.addColorStop(0, '#9b111e');      
    gradient.addColorStop(0.3, '#9b111e');    
    gradient.addColorStop(0.5, '#ffffff'); // БЕЛЫЙ ЦЕНТР ИМПУЛЬСА
    gradient.addColorStop(0.7, '#9b111e');    
    gradient.addColorStop(1, '#9b111e');      
    
    return gradient;
}

const businessChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Старт', '1 мес', '3 мес', '6 мес', '12 мес'],
        datasets: [
            {
                label: 'Мое решение',
                data: [20, 45, 75, 90, 98],
                // Цвет линии вычисляется динамически
                borderColor: function(context) {
                    return getMovingGradient(context.chart);
                },
                // Заливка вычисляется динамически
                backgroundColor: function(context) {
                    return getAreaGradient(context.chart);
                },
                borderWidth: 4,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            },
            {
                label: 'Без оптимизации',
                data: [20, 22, 25, 24, 26],
                borderColor: '#333',
                borderDash: [5, 5],
                borderWidth: 2,
                fill: false,
                tension: 0,
                pointRadius: 0
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false, // Отключаем, чтобы не конфликтовать с requestAnimationFrame
        plugins: { legend: { display: false } },
        scales: {
            y: { 
                grid: { color: '#111' },
                ticks: { color: '#555', font: { family: 'JetBrains Mono' } }
            },
            x: { 
                grid: { display: false },
                ticks: { color: '#555', font: { family: 'JetBrains Mono' } }
            }
        }
    },
    plugins: [{
        // Добавляем GLOW свечение для всей красной линии
        beforeDraw: (chart) => {
            const { ctx } = chart;
            ctx.save();
            ctx.shadowColor = 'rgba(155, 17, 30, 0.4)';
            ctx.shadowBlur = 15;
        },
        afterDraw: (chart) => {
            chart.ctx.restore();
        }
    }]
});

// 3. ПЛАВНАЯ АНИМАЦИЯ
function animate() {
    if (businessChart.chartArea) {
        const chartWidth = businessChart.chartArea.width;
        
        offset += 1.2; // Слегка замедлил для солидности
        
        // Перезапуск импульса
        if (offset > chartWidth + 400) {
            offset = -100;
        }
        
        businessChart.update('none'); // Обновление без лишних перерисовок
    }
    requestAnimationFrame(animate);
}

// Запуск с небольшой задержкой, чтобы chartArea успел инициализироваться
setTimeout(animate, 200);