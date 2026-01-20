// 1. КОНСТАНТЫ И ДАННЫЕ (Объявляем в самом начале)
const glyphs = "ABCDEFGHIKLMNOPQRSTVXYZ0123456789+=/-_";



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

    // 2. ДОБАВЬ ЭТО: Движение карточки проекта
    if (hoverCard && hoverCard.style.display === 'block') {
        // Смещаем на +20px, чтобы она не перекрывала узел под курсором
        hoverCard.style.left = (e.clientX + 20) + 'px';
        hoverCard.style.top = (e.clientY + 20) + 'px';
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

    if (hoverCard && hoverCard.style.display === 'block') {
        hoverCard.style.left = (e.clientX + 20) + 'px'; // Смещение вправо
        hoverCard.style.top = (e.clientY + 10) + 'px';  // Смещение вниз
    }

});

// 2. ИНИЦИАЛИЗАЦИЯ ГРАФА
const container = document.getElementById('graph-container');
const graphDiv = document.getElementById('graph');
const hoverCard = document.getElementById('graph-hover-card');
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
    .cooldownTime(600000) // Твои 10 минут
    // --- НОВОЕ: ЧАСТИЦЫ НА СВЯЗЯХ ---
    .linkDirectionalParticles(2)
    .linkDirectionalParticleWidth(1.5)
    .linkDirectionalParticleSpeed(0.005)
    .linkDirectionalParticleColor(() => '#ffffff')
    // -------------------------------
    .onNodeDrag((node) => {
        mousePos.x = node.x; 
        node.fx = node.x;
        node.fy = node.y;
    })
    .onNodeDragEnd(node => {
        node.fx = node.x;
        node.fy = node.y;
    })
    .nodeLabel(null) // ОТКЛЮЧАЕМ ДЕФОЛТНЫЙ ТУЛТИП
    .onNodeHover(node => {
        if (node) {
            cursor.classList.add('active');
            hoverCard.style.display = 'block';
            hoverCard.style.pointerEvents = 'none'; // Чтобы не мешала клику
            
            hoverCard.innerHTML = `
                <div style="
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    width: 320px;
                    font-family: 'JetBrains Mono', monospace;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.9);
                    display: flex;
                    flex-direction: column;
                ">
                    <div style="width: 100%; height: 180px; background: #000; overflow: hidden; border-bottom: 1px solid rgba(255, 255, 255, 0.05);">
                        <img src="${node.img}" style="width: 100%; height: 100%; object-fit: cover;" 
                             onerror="this.src='https://via.placeholder.com/320x180?text=IMAGE_NOT_FOUND'">
                    </div>

                    <div style="padding: 20px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: #666; font-size: 12px; text-transform: uppercase;">// ${node.product}</span>
                            <span style="color: #444; font-size: 12px;">ID: 00${node.id}</span>
                        </div>
                        
                        <div style="color: #fff; font-size: 18px; font-weight: bold; margin-bottom: 12px; letter-spacing: -0.5px;">
                            ${node.name.toUpperCase()}
                        </div>

                        <div style="color: #aaa; font-size: 14px; line-height: 1.5; margin-bottom: 20px; height: 3.3em; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">
                            ${node.problem}
                        </div>

                        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 15px;">
                            <div style="display: flex; flex-direction: column; gap: 2px;">
                                <span style="color: #555; font-size: 10px;">ROLE</span>
                                <span style="color: #eee; font-size: 10px;">${node.role}</span>
                            </div>
                            <div style="color: #fff; font-size: 12px; font-weight: bold; border: 1px solid #fff; padding: 4px 8px; opacity: 0.8;">
                                ЖМИ, ЧТОБЫ УВИДЕТЬ
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            cursor.classList.remove('active');
            hoverCard.style.display = 'none';
        }
    })
    .onRenderFramePre((ctx, globalScale) => {
        // Твоя сетка
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
    .nodeCanvasObject((node, ctx, globalScale) => {
        const label = node.name;
        const isHovered = mousePos.x !== null && Math.sqrt(Math.pow(node.x - mousePos.x, 2) + Math.pow(node.y - mousePos.y, 2)) < 15;
        
        // Проверяем, является ли проект топовым (добавь featured: true в data.js для Trafflow)
        const isFeatured = node.featured === true;
        
        // Параметры геометрии
        const baseRadius = isFeatured ? 7 : 4; 
        const t = Date.now() / 1000;
        const breathe = Math.sin(t * (isFeatured ? 3 : 2)) * (isFeatured ? 1.2 : 0.5);
        const radius = (isHovered ? baseRadius * 1.3 : baseRadius) + breathe;
        
        ctx.save();

        // 1. АНИМИРОВАННАЯ АУРА
        const pulse = (Date.now() / (isFeatured ? 800 : 1200)) % 1;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + (pulse * (isFeatured ? 12 : 6)), 0, 2 * Math.PI);
        
        // Для Trafflow используем красный акцент, для остальных — белый
        const auraColor = isFeatured ? '155, 17, 30' : '255, 255, 255';
        ctx.strokeStyle = `rgba(${auraColor}, ${0.4 * (1 - pulse)})`;
        ctx.lineWidth = (isFeatured ? 1.5 : 0.5) / globalScale;
        ctx.stroke();

        // 2. ТЕЛО УЗЛА (Glass style)
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        
        if (isFeatured) {
            // Trafflow: Красный светящийся центр
            ctx.shadowBlur = isHovered ? 25 : 15;
            ctx.shadowColor = "#9b111e";
            ctx.fillStyle = isHovered ? "#ff1a2d" : "#9b111e";
            ctx.fill();
            // Тонкий белый ободок для контраста
            ctx.strokeStyle = "rgba(255,255,255,0.8)";
            ctx.lineWidth = 1 / globalScale;
            ctx.stroke();
        } else if (isHovered) {
            // Обычный узел при наведении: Белый глянец
            ctx.shadowBlur = 15;
            ctx.shadowColor = "#ffffff";
            ctx.fillStyle = "#ffffff";
            ctx.fill();
        } else {
            // Обычный узел в покое: Прозрачный с бортом
            ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
            ctx.lineWidth = 1.2 / globalScale;
            ctx.stroke();
            ctx.fillStyle = "rgba(0,0,0,0.8)";
            ctx.fill();
        }

        // 3. ПОДПИСЬ (Glassmorphism Label)
        const fontSize = (isFeatured ? 13 : 11) / globalScale;
        ctx.font = `${isFeatured ? 'bold' : 'normal'} ${fontSize}px 'JetBrains Mono'`;
        
        const textY = node.y + radius + (14 / globalScale);
        const textWidth = ctx.measureText(label).width;
        const padding = 4 / globalScale;

        // Подложка текста
        ctx.fillStyle = isFeatured ? "rgba(155, 17, 30, 0.15)" : (isHovered ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.5)");
        ctx.fillRect(
            node.x - (textWidth/2) - padding, 
            textY - (fontSize/2) - padding/2, 
            textWidth + padding*2, 
            fontSize + padding
        );

        // Текст
        ctx.fillStyle = (isFeatured || isHovered) ? "#ffffff" : "rgba(255, 255, 255, 0.7)";
        ctx.textAlign = 'center';
        ctx.fillText(label, node.x, textY + (fontSize/2.5));
        
        ctx.restore();
    })
    .onNodeClick(node => {
        // Переход на страницу проекта вместо просто модалки
        window.location.href = `project.html?id=${node.id}`;
    })

    .nodePointerAreaPaint((node, color, ctx, globalScale) => {
        const areaRadius = 18; // Увеличили зону клика (базовый радиус был ~4)
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, areaRadius / globalScale, 0, 2 * Math.PI);
        ctx.fill();
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