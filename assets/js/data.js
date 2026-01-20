window.myData = {
    nodes: [
        // --- КЛАСТЕР: ТЕЛЕГРАМ И ГЕЙМДЕВ ---
        { 
            id: 1, name: "Project Virus", date: "2024", 
            img: "assets/media/projects/virus.webp",
            product: "WebApp Telegram Game", role: "Full Product Design", timeline: "4 Weeks",
            problem: "Однообразный геймплей и отсутствие мотивации возвращаться в приложение после первого дня.", 
            solution: "Разработка системы ежедневных квестов и визуализация прогресса через эволюционирующий UI.", 
            result: "Рост DAU на 40%, успешная интеграция механик удержания (Retention D7).", 
            link: "#" 
        },
        { 
            id: 2, name: "Virus Promo Banner", date: "2024", 
            img: "assets/media/projects/virus_banner.webp",
            product: "Graphic Design", role: "Visual Designer", timeline: "2 Days",
            problem: "Низкий CTR рекламных объявлений в Telegram-каналах из-за визуального шума.", 
            solution: "Создание высококонтрастного баннера с акцентом на ключевой геймплейный элемент.", 
            result: "Увеличение кликабельности (CTR) на 25% относительно стандартных креативов.", 
            link: "#" 
        },

        // --- КЛАСТЕР: ВЕБ-ПРИЛОЖЕНИЯ (SAAS) ---
        { 
            id: 3, name: "Trafflow", date: "2024", 
            img: "assets/media/projects/trafflow.webp",
            product: "SaaS Platform", role: "Lead UX/UI Designer", timeline: "2 Months",
            problem: "Сложный порог входа для байеров; перегруженные интерфейсы аналитики замедляли работу.", 
            solution: "Разработка модульного дашборда с кастомными фильтрами и системой «быстрых действий».", 
            result: "Скорость работы оператора +30%, когнитивная нагрузка снижена.", 
            link: "#" 
        },

        // --- КЛАСТЕР: РЕКЛАМНЫЕ ЛЕНДИНГИ (REAL ESTATE & BUSINESS) ---
        { 
            id: 4, name: "ЖК ЛЕГЕНДА", date: "2024", 
            img: "assets/media/projects/legenda.webp",
            product: "Real Estate Landing", role: "UI Designer", timeline: "2 Weeks",
            problem: "Низкая конверсия в запись на просмотр из-за неинформативности планировок.", 
            solution: "Внедрение интерактивного выбора этажей и эмоциональный визуальный сторителлинг.", 
            result: "Рост CR в целевое действие на 2.5%, повышение премиальности бренда.", 
            link: "#" 
        },
        { 
            id: 5, name: "Construction USA", date: "2024", 
            img: "assets/media/projects/usa_landing.webp",
            product: "B2B Landing", role: "UX Researcher", timeline: "3 Weeks",
            problem: "Недоверие западной аудитории к локальному дизайну; несоответствие UX-паттернов рынку США.", 
            solution: "Ресерч конкурентов, внедрение системы Trust-блоков и формы быстрого расчета Quote.", 
            result: "Успешная валидация гипотез на иностранном трафике, получен первый контракт.", 
            link: "#" 
        },
        { 
            id: 6, name: "Detrox Company", date: "2024", 
            img: "assets/media/projects/detrox.webp",
            product: "Industrial Landing", role: "UX/UI Designer", timeline: "2 Weeks",
            problem: "Устаревший имидж компании не позволял выйти на тендеры с крупными игроками.", 
            solution: "Минималистичный «технологичный» дизайн с акцентом на масштаб производства и надежность.", 
            result: "Успешный ребрендинг цифрового присутствия, рост имиджевых показателей на 15%.", 
            link: "#" 
        },
        { 
            id: 7, name: "Design Home", date: "2023", 
            img: "assets/media/projects/design_home.webp",
            product: "Interior Landing", role: "Solo Designer", timeline: "10 Days",
            problem: "Сложность визуализации экспертности бюро без перегруза страницы портфолио.", 
            solution: "Чистая швейцарская сетка и акцент на качественную типографику и whitespace.", 
            result: "Увеличение времени просмотра портфолио в 2 раза.", 
            link: "#" 
        },
        { 
            id: 8, name: "Football School", date: "2023", 
            img: "assets/media/projects/football.webp",
            product: "Sports Landing", role: "UX/UI Designer", timeline: "2 Weeks",
            problem: "Родители не понимали преимуществ «новой школы» по сравнению с классическими секциями.", 
            solution: "Инфографика тренировочного процесса с подробным описанием.", 
            result: "Запись на пробную тренировку выросла на 30%.", 
            link: "#" 
        },
        { 
            id: 9, name: "Books Shop", date: "2023", 
            img: "assets/media/projects/books.webp",
            product: "E-commerce Landing", role: "UI Designer", timeline: "1 Week",
            problem: "Пользователи терялись в каталоге; отсутствие фокуса на бестселлерах.", 
            solution: "Минималистичная витрина с четкой иерархией и быстрой покупкой в 1 клик.", 
            result: "Средний чек вырос на 12% за счет правильных акцентов.", 
            link: "#" 
        },
        

        // --- КЛАСТЕР: PROMO & CREATIVE ---
        { 
            id: 10, name: "Spider-Man vs Venom", date: "2024", 
            img: "assets/media/projects/marvel_vote.webp",
            product: "Promo / Voting App", role: "UX/UI & Interaction", timeline: "1 Week",
            problem: "Высокий риск дропа пользователей на этапе сложной авторизации.", 
            solution: "Геймифицированный интерфейс с мгновенной обратной связью и zero-click взаимодействием.", 
            result: "Виральный охват >10k участников за 48 часов, 85% завершенных сессий.", 
            link: "#" 
        },
        { 
            id: 11, name: "Moscow Models", date: "2024", 
            img: "assets/media/projects/model_agency.webp",
            product: "Agency Landing", role: "UI Designer", timeline: "2 Weeks",
            problem: "Необходимость создания WOW-эффекта лендинга и визуального хаоса, а также лёгкого подбора моделей каталоге для поиска нужного типажа.", 
            solution: "Упор на визуализацию и создание системы «карточек», фокусирующих внимание на лице.", 
            result: "Ускорение процесса сбора лидов (моделей) для кастинг-директоров на 40%.", 
            link: "#" 
        },
        

        // --- КЛАСТЕР: МОБИЛЬНЫЕ ПРИЛОЖЕНИЯ ---
        { 
            id: 12, name: "AI Basketball Training", date: "2024", 
            img: "assets/media/projects/ball_ai.webp",
            product: "SportTech App", role: "UX/UI Designer", timeline: "1 Month",
            problem: "Сложность интеграции видео-аналитики без отвлечения атлета от тренировки.", 
            solution: "Интерфейс с голосовым управлением и минимизированным UI для фокусировки на нейросети.", 
            result: "Сокращение времени настройки сессии до 15 секунд.", 
            link: "#" 
        },
        { 
            id: 13, name: "City Quests", date: "2024", 
            img: "assets/media/projects/city_quest.webp",
            product: "Mobile App", role: "UI/UX Designer", timeline: "3 Weeks",
            problem: "Пользователи теряли интерес к квестам из-за отсутствия прогрессии и карты.", 
            solution: "Внедрение интерактивной карты города с элементами AR и системой ачивок.", 
            result: "Среднее время сессии выросло на 20%.", 
            link: "#" 
        },
        { 
            id: 14, name: "Coworking App", date: "2023", 
            img: "assets/media/projects/coworking.webp",
            product: "Booking App", role: "UI/UX Designer", timeline: "3 Weeks",
            problem: "Длительный процесс бронирования места (6+ экранов) приводил к отказам.", 
            solution: "Редизайн флоу до 3-х кликов с использованием функции One-Tap Booking.", 
            result: "Конверсия в успешное бронирование выросла на 45%.", 
            link: "#" 
        },
        { 
            id: 15, name: "Let's Ride", date: "2023", 
            img: "assets/media/projects/ride_ux.webp",
            product: "Deep UX Study", role: "UX Researcher", timeline: "1 Month",
            problem: "Несоответствие интерфейса когнитивным паттернам мотоциклистов во время движения.", 
            solution: "Проектирование высококонтрастного интерфейса с крупными зонами тапа для управления в перчатках.", 
            result: "Создание эталонного фреймворка для экстремальных мобильных интерфейсов.", 
            link: "#" 
        },

        // --- КЛАСТЕР: ГРАФИКА И БРЕНДИНГ ---
        { 
            id: 16, name: "EggOnTon Logo", date: "2024", 
            img: "assets/media/projects/eggon.webp",
            product: "WebApp Branding", role: "Brand Designer", timeline: "1 Week",
            problem: "Отсутствие идентичности в экосистеме TON, бренд сливался с конкурентами.", 
            solution: "Разработка уникального маскота и шрифтового начертания в стиле кибер-панк.", 
            result: "Узнаваемость проекта выросла, сформирован четкий бренд-бук.", 
            link: "#" 
        },
        { 
            id: 17, name: "Open Source Browser", date: "2024", 
            img: "assets/media/projects/browser_logo.webp",
            product: "Software Identity", role: "Graphic Designer", timeline: "1 Week",
            problem: "Логотип выглядел слишком «корпоративно», отпугивая комьюнити разработчиков.", 
            solution: "Абстрактный динамический знак, символизирующий свободу данных и модульность.", 
            result: "Позитивный фидбек от сообщества, принятие нового стиля на GitHub.", 
            link: "#" 
        },
        { 
            id: 18, name: "Premiere Track (Video)", date: "2024", 
            img: "assets/media/projects/video_preview.webp",
            product: "Music Video", role: "Motion Designer", timeline: "2 Months",
            problem: "Необходимость тяжелого визуального ряда при ограниченном бюджете на съемки.", 
            solution: "Использование сложного CGI-монтажа, цветокоррекции и динамических переходов.", 
            result: "Готовый продукт уровня стриминговых платформ, повышение вовлеченности аудитории.", 
            link: "#" 
        }
    ],
    links: [
        { source: 1, target: 2 }, // Связь игры и её баннера
        { source: 1, target: 15 }, // Связь игры и EggOnTon (допустим)
    ]
};