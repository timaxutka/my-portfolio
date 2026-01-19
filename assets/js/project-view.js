// Данные проектов (скопируй те же, что были в основном файле, или вынеси в data.js)
const myData = {
    nodes: [
        // КЛАСТЕР: ТЕЛЕГРАМ И ГЕЙМДЕВ (ЕСТЬ СВЯЗИ)
        { 
            id: 1, name: "Project Virus", date: "2024", 
            img: "img/1.png",
            product: "WebApp Telegram Game", role: "Full Product Design", timeline: "4 Weeks",
            problem: "Однообразный геймплей и отсутствие мотивации возвращаться в приложение после первого дня.", 
            solution: "Разработка системы ежедневных квестов и визуализация прогресса через эволюционирующий UI.", 
            result: "Рост DAU на 40%, успешная интеграция механик удержания (Retention D7).", 
            link: "#" 
        },
        { 
            id: 2, name: "Virus Promo Banner", date: "2024", 
            img: "img/projects/virus_banner.webp",
            product: "Graphic Design", role: "Visual Designer", timeline: "2 Days",
            problem: "Низкий CTR рекламных объявлений в Telegram-каналах из-за визуального шума.", 
            solution: "Создание высококонтрастного баннера с акцентом на ключевой геймплейный элемент.", 
            result: "Увеличение кликабельности (CTR) на 25% относительно стандартных креативов.", 
            link: "#" 
        },

        // ВЕБ-ПРИЛОЖЕНИЯ
        { 
            id: 3, name: "Trafflow", date: "2024", 
            img: "img/projects/trafflow.webp",
            product: "SaaS Platform", role: "Lead UX/UI Designer", timeline: "2 Months",
            problem: "Сложный порог входа для байеров; перегруженные интерфейсы аналитики замедляли работу.", 
            solution: "Разработка модульного дашборда с кастомными фильтрами и системой «быстрых действий».", 
            result: "Скорость работы оператора +30%, когнитивная нагрузка снижена.", 
            link: "#" 
        },

        // РЕКЛАМНЫЕ ЛЕНДИНГИ
        { 
            id: 4, name: "ЖК ЛЕГЕНДА", date: "2024", 
            img: "img/projects/legenda.webp",
            product: "Real Estate Landing", role: "UI Designer", timeline: "2 Weeks",
            problem: "Низкая конверсия в запись на просмотр из-за неинформативности планировок.", 
            solution: "Внедрение интерактивного выбора этажей и эмоциональный визуальный сторителлинг.", 
            result: "Рост CR в целевое действие на 2.5%, повышение премиальности бренда.", 
            link: "#" 
        },
        { 
            id: 5, name: "Spider-Man vs Venom", date: "2024", 
            img: "img/projects/marvel_vote.webp",
            product: "Promo / Voting App", role: "UX/UI & Interaction", timeline: "1 Week",
            problem: "Высокий риск дропа пользователей на этапе сложной авторизации.", 
            solution: "Геймифицированный интерфейс с мгновенной обратной связью и zero-click взаимодействием.", 
            result: "Виральный охват >10k участников за 48 часов, 85% завершенных сессий.", 
            link: "#" 
        },
        { 
            id: 6, name: "Construction USA", date: "2024", 
            img: "img/projects/usa_landing.webp",
            product: "B2B Landing", role: "UX Researcher", timeline: "3 Weeks",
            problem: "Недоверие западной аудитории к локальному дизайну; несоответствие UX-паттернов рынку США.", 
            solution: "Ресерч конкурентов, внедрение системы Trust-блоков и формы быстрого расчета Quote.", 
            result: "Успешная валидация гипотез на иностранном трафике, получен первый контракт.", 
            link: "#" 
        },

        // МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ
        { 
            id: 7, name: "AI Basketball Training", date: "2024", 
            img: "img/projects/ball_ai.webp",
            product: "SportTech App", role: "UX/UI Designer", timeline: "1 Month",
            problem: "Сложность интеграции видео-аналитики без отвлечения атлета от тренировки.", 
            solution: "Интерфейс с голосовым управлением и минимизированным UI для фокусировки на нейросети.", 
            result: "Сокращение времени настройки сессии до 15 секунд.", 
            link: "#" 
        },
        { 
            id: 8, name: "City Quests", date: "2024", 
            img: "img/projects/city_quest.webp",
            product: "Mobile App", role: "UI/UX Designer", timeline: "3 Weeks",
            problem: "Пользователи теряли интерес к квестам из-за отсутствия прогрессии и карты.", 
            solution: "Внедрение интерактивной карты города с элементами AR и системой ачивок.", 
            result: "Среднее время сессии выросло на 20%.", 
            link: "#" 
        },

        // ЛОГОТИПЫ И ГРАФИКА
        { 
            id: 9, name: "EggOnTon Logo", date: "2024", 
            img: "img/projects/eggon.webp",
            product: "WebApp Branding", role: "Brand Designer", timeline: "1 Week",
            problem: "Отсутствие идентичности в экосистеме TON, бренд сливался с конкурентами.", 
            solution: "Разработка уникального маскота и шрифтового начертания в стиле кибер-панк.", 
            result: "Узнаваемость проекта выросла, сформирован четкий бренд-бук.", 
            link: "#" 
        },
        { 
            id: 10, name: "Premiere Track (Video)", date: "2024", 
            img: "img/projects/video_preview.webp",
            product: "Music Video", role: "Motion Designer", timeline: "2 Months",
            problem: "Необходимость тяжелого визуального ряда при ограниченном бюджете на съемки.", 
            solution: "Использование сложного CGI-монтажа, цветокоррекции и динамических переходов.", 
            result: "Готовый продукт для релиза на стриминговых платформах.", 
            link: "#" 
        }
    ],
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. ПОЛУЧЕНИЕ ДАННЫХ
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const project = myData.nodes.find(n => n.id === projectId);

    if (project) {
        // Заполняем текст
        document.getElementById('p-title').innerText = project.title;
        document.getElementById('p-problem').innerText = project.problem;
        document.getElementById('p-solution').innerText = project.solution;
        document.getElementById('p-result').innerText = project.result;
        document.getElementById('p-date').innerText = project.date;
        document.getElementById('p-category').innerText = project.category;
        document.getElementById('p-role').innerText = project.role;
        document.getElementById('p-timeline').innerText = project.timeline;

        // Заполняем картинки
        document.getElementById('img-problem').src = project.imgP;
        document.getElementById('img-solution').src = project.imgS;
        document.getElementById('img-result').src = project.imgR;
    }

    // 2. SIDE-BY-SIDE SCROLL (Intersection Observer)
    const sections = document.querySelectorAll('.case-section');
    const medias = document.querySelectorAll('.case-media');

    const observerOptions = { threshold: 0.6 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                medias.forEach(m => m.classList.remove('active'));
                medias[index].classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));

    // 3. ВЕРТИКАЛЬНЫЙ ПРОГРЕСС-БАР
    window.addEventListener('scroll', () => {
        const progress = document.getElementById('project-progress');
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progress.style.height = scrollPercent + '%';
    });

    // 4. МАГНИТНАЯ КНОПКА
    initMagnetButton();
    
    // 5. КАСТОМНЫЙ КУРСОР
    initCustomCursor();
});

// ФУНКЦИЯ КУРСОРA (Подтянута из основы)
function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Эффект увеличения на кнопках
    const targets = document.querySelectorAll('a, button, .cta-btn');
    targets.forEach(t => {
        t.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2.5)');
        t.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
}

// ФУНКЦИЯ МАГНИТА
function initMagnetButton() {
    const btn = document.getElementById('back-btn');
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
}