document.addEventListener('DOMContentLoaded', () => {
    renderHubGrid(); // Рисуем карточки сразу при загрузке страницы
});

function renderHubGrid() {
    const container = document.getElementById('hub-grid-container');
    if (!container) return;

    let html = '';
    myData.nodes.forEach(node => {
        // Если картинки нет — будет белый фон (через CSS класс card-preview)
        const imgTag = node.img ? `<img src="${node.img}" alt="${node.name}">` : '';

        html += `
            <div class="project-card" onclick="openProjectDetails(${node.id})">
                <div class="card-preview">${imgTag}</div>
                <div class="card-info">
                    <p>${node.product}</p>
                    <h3>${node.name}</h3>
                    <div class="card-result">// ${node.result}</div>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Если хочешь, чтобы на новой странице тоже открывались модалки:
function openProjectDetails(id) {
    const node = myData.nodes.find(n => n.id === id);
    if (node) {
        showModal(node); // Твоя старая добрая функция модалки
    }
}

// 3. ЕДИНЫЙ ОБРАБОТЧИК МЫШИ (Курсор + Координаты + Параллакс + Граф)
const cursor = document.getElementById('custom-cursor');
const coords = document.getElementById('mouse-coords');
const photo = document.getElementById('parallax-photo');

