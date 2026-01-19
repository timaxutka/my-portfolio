document.addEventListener('DOMContentLoaded', () => {
    // 1. ДАННЫЕ ИЗ URL
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    // Находим проект (поддерживаем и числа, и строки для безопасности)
    const project = myData.nodes.find(n => n.id == projectId);

    if (project) {
        // Текстовые поля
        safeSetText('p-title', project.name);
        safeSetText('p-problem', project.problem);
        safeSetText('p-solution', project.solution);
        safeSetText('p-result', project.result);
        safeSetText('p-date', project.date);
        safeSetText('p-category', project.product);
        safeSetText('p-role', project.role);
        safeSetText('p-timeline', project.timeline);

        const linkBtn = document.getElementById('p-link');
        if (linkBtn) linkBtn.href = project.link || "#";

        // Картинки: Превью + 3 этапа
        const mainImg = project.img || "";
        // Заполняем превью (индекс "top")
        const imgPreview = document.getElementById('img-preview');
        if (imgPreview) imgPreview.src = mainImg;

        // Заполняем остальные (если спец. картинок нет, дублируем главную)
        document.getElementById('img-problem').src = project.imgP || mainImg;
        document.getElementById('img-solution').src = project.imgS || mainImg;
        document.getElementById('img-result').src = project.imgR || mainImg;
    }

    function safeSetText(id, text) {
        const el = document.getElementById(id);
        if (el) el.innerText = text;
    }

    // 2. УМНЫЙ СКРОЛЛ (SIDE-BY-SIDE)
    const sections = document.querySelectorAll('.case-section');
    const medias = document.querySelectorAll('.case-media');

    const observerOptions = {
        threshold: 0.5, // Срабатывает, когда секция видна на 50%
        rootMargin: "-10% 0px -10% 0px" // Небольшой отступ для точности
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                
                // Убираем активный класс у всех
                medias.forEach(m => m.classList.remove('active'));
                
                // Включаем нужную картинку
                const targetMedia = document.querySelector(`.case-media[data-index="${index}"]`);
                if (targetMedia) targetMedia.classList.add('active');
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));

    // Логика для возврата к превью, если мы в самом верху
    window.addEventListener('scroll', () => {
        if (window.scrollY < 200) {
            medias.forEach(m => m.classList.remove('active'));
            const topMedia = document.querySelector('.case-media[data-index="top"]');
            if (topMedia) topMedia.classList.add('active');
        }

        // 3. ПРОГРЕСС-БАР (ВЕРТИКАЛЬНЫЙ)
        const progress = document.getElementById('project-progress');
        if (progress) {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progress.style.height = scrollPercent + '%';
        }
    });

    // 4. КУРСОР И МАГНИТ
    initCustomCursor();
    initMagnetButton();
});

function initCustomCursor() {
    const cursor = document.getElementById('custom-cursor');
    const xCoord = document.getElementById('coord-x');
    const yCoord = document.getElementById('coord-y');
    
    if (!cursor) return;

    document.addEventListener('mousemove', (e) => {
        // Движение курсора
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        // Обновление координат (X: 000 Y: 000)
        if (xCoord && yCoord) {
            xCoord.innerText = Math.floor(e.clientX).toString().padStart(3, '0');
            yCoord.innerText = Math.floor(e.clientY).toString().padStart(3, '0');
        }
    });

    // Ховер-эффекты
    const targets = document.querySelectorAll('a, button, .cta-btn, #back-btn');
    targets.forEach(t => {
        t.addEventListener('mouseenter', () => cursor.style.transform = 'translate(-50%, -50%) scale(2.5)');
        t.addEventListener('mouseleave', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');
    });
}

function initMagnetButton() {
    const btn = document.getElementById('back-btn');
    if (!btn) return;

    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
        const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
        btn.style.transform = `translate(${x}px, ${y}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
}