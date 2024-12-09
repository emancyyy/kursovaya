// Получаем все кнопки "Нравится" на странице
const likeButtons = document.querySelectorAll(".like-button");

// Проходим по каждой кнопке
likeButtons.forEach(button => {
    // Добавляем обработчик события клика
    button.addEventListener("click", () => {
        // Переключаем класс "active" у кнопки (выделение)
        button.classList.toggle("active");
    });
});

// Выполняем код после полной загрузки DOM
document.addEventListener("DOMContentLoaded", () => {
    // Получаем все кнопки "Добавить в корзину"
    const cartButtons = document.querySelectorAll(".cart-button");

    // Загружаем список товаров из локального хранилища или создаём новый
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Функция для обновления отображения товаров в корзине
    function updateCartDisplay() {
        // Сохраняем текущий список товаров в локальное хранилище
        localStorage.setItem("cart", JSON.stringify(cartItems));

        // Получаем все карточки товаров
        const cartCards = document.querySelectorAll(".cart-card");

        // Обновляем видимость карточек в зависимости от корзины
        cartCards.forEach(card => {
            // Получаем идентификатор товара из атрибута data
            const product = card.dataset.product;

            // Показываем или скрываем карточку в зависимости от содержимого корзины
            if (cartItems.includes(product)) {
                card.style.display = "flex"; // Показываем карточку
            } else {
                card.style.display = "none"; // Скрываем карточку
            }
        });
    }

    // Добавляем обработчик события на каждую кнопку "Добавить в корзину"
    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Получаем идентификатор товара из атрибута data
            const product = button.dataset.product;

            // Проверяем, есть ли товар в корзине
            if (cartItems.includes(product)) {
                // Удаляем товар из корзины
                cartItems = cartItems.filter(item => item !== product);
                alert(`${product} удалён из корзины!`); // Показываем сообщение
            } else {
                // Добавляем товар в корзину
                cartItems.push(product);
                alert(`${product} добавлен в корзину!`); // Показываем сообщение
            }

            // Обновляем отображение корзины
            updateCartDisplay();
        });
    });

    // Инициализируем отображение корзины при загрузке страницы
    updateCartDisplay();
});

// Обрабатываем форму покупки
document.getElementById("purchase-form").addEventListener("submit", function (event) {
    event.preventDefault(); // Отменяем стандартное поведение формы

    // Получаем значения полей формы
    const email = document.getElementById("email").value.trim(); // Поле email
    const phone = document.getElementById("phone").value.trim(); // Поле телефона
    const address = document.getElementById("address").value.trim(); // Поле адреса
    const cardNumber = document.getElementById("card-number").value.trim(); // Поле номера карты
    const cardExpiry = document.getElementById("card-expiry").value.trim(); // Поле срока действия карты
    const cardCVV = document.getElementById("card-cvv").value.trim(); // Поле CVV-кода

    // Проверяем, заполнены ли все поля
    if (email && phone && address && cardNumber && cardExpiry && cardCVV) {
        alert("Спасибо за покупку!"); // Показываем сообщение об успешной покупке
        this.reset(); // Сбрасываем форму после отправки
    } else {
        alert("Пожалуйста, заполните все поля."); // Показываем сообщение о необходимости заполнения
    }
});
