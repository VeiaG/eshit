 // Функція для отримання даних з файлу cab.json
 async function fetchCabData() {
    try {
        const response = await fetch('./cab.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Помилка отримання даних з файлу:', error);
        return [];
    }
}

// Функція для створення HTML-блоку на основі отриманих даних
async function createCabinBlock() {
    const cabData = await fetchCabData();
    const cabinContainer = document.querySelector('.cabin');

    cabData.forEach((cab, index) => {
        const cabinItem = document.createElement('div');
        cabinItem.classList.add('cabin__item');

        const label = document.createElement('div');
        label.classList.add('cabin__item-label');
        label.textContent = `Кабінка №${index + 1}`;
        cabinItem.appendChild(label);

        const state = document.createElement('div');
        state.classList.add('cabin__item-state');

        // Визначаємо клас для стану на основі даних з файлу
        if (cab.state === 'working') {
            state.classList.add('sucess');
            state.textContent = 'Працює';
        } else if (cab.state === 'error') {
            state.classList.add('error');
            state.textContent = 'Не працює';
        } else if (cab.state === 'warning') {
            state.classList.add('warning');
            state.textContent = 'Забито';
        } else {
            state.textContent = 'Невідомий стан';
        }

        cabinItem.appendChild(state);
        cabinContainer.appendChild(cabinItem);
    });
}

// Виклик функції для створення HTML-блоку
createCabinBlock();