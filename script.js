document.addEventListener('DOMContentLoaded', (event) => {
    const productNameInput = document.querySelector('.product-name');
    const addButton = document.querySelector('.add-button');
    const productList = document.querySelector('.container1');
    const remainingProducts = document.querySelector('#remainingProducts');
    const purchasedProducts = document.querySelector('#purchasedProducts');

    let products = [
        { name: 'Помідори', quantity: 2, purchased: true },
        { name: 'Печиво', quantity: 2, purchased: false },
        { name: 'Сир', quantity: 1, purchased: false }
    ];

    function renderProducts() {

        productList.querySelectorAll('.productneed').forEach(item => item.remove());

        remainingProducts.innerHTML = '';
        purchasedProducts.innerHTML = '';

        products.forEach((product, index) => {
            const productElement = document.createElement('div');
            productElement.className = 'productneed';
            productElement.innerHTML = `
                <div class="name" contenteditable="${!product.purchased}"><p>${product.purchased ? `<s>${product.name}</s>` : product.name}</p></div>
                <div class="count">
                    ${!product.purchased ? `
                    <button class="minus" data-tooltip="Зменшити к-сть" ${product.quantity === 1 ? 'disabled' : ''}>-</button>
                    <span class="number">${product.quantity}</span>
                    <button class="plus" data-tooltip="Збільшіти к-сть">+</button>
                    ` : `<span class="number">${product.quantity}</span>`}
                </div>
                <div class="status">
                    <button class="isBought" data-tooltip="Змінити статус товару">${product.purchased ? 'Не куплено' : 'Куплено'}</button>
                    ${!product.purchased ? '<button class="remove" data-tooltip="Видалити товар">x</button>' : ''}
                </div>
            `;

            productList.appendChild(productElement);

            // Event listeners
            if (!product.purchased) {
                productElement.querySelector('.plus').addEventListener('click', () => changeQuantity(index, 1));
                productElement.querySelector('.minus').addEventListener('click', () => changeQuantity(index, -1));
                productElement.querySelector('.remove').addEventListener('click', () => removeProduct(index));
                productElement.querySelector('.name').addEventListener('blur', (e) => editProductName(index, e.target.textContent));
            }
            productElement.querySelector('.isBought').addEventListener('click', () => togglePurchased(index));

            // Update statistics
            if (product.purchased) {
                purchasedProducts.innerHTML += `<span class="productleft"><s>${product.name}</s><span class="countleft"><s>${product.quantity}</s></span></span>`;
            } else {
                remainingProducts.innerHTML += `<span class="productleft">${product.name}<span class="countleft">${product.quantity}</span></span>`;
            }
        });
    }
    function addProduct() {
        const productName = productNameInput.value.trim();
        if (productName) {
            // Перевіряємо, чи не існує вже продукт з таким самим ім'ям
            if (products.some(product => product.name.toLowerCase() === productName.toLowerCase())) {
                alert('Продукт з таким іменем вже існує.');
            } else {
                products.push({ name: productName, quantity: 1, purchased: false });
                productNameInput.value = '';
                productNameInput.focus();
                renderProducts();
            }
        } else {
            alert('Назва продукту не може бути порожньою.');
        }
    }

    function removeProduct(index) {
        products.splice(index, 1)
        renderProducts();
    }

    function togglePurchased(index) {
        products[index].purchased = !products[index].purchased;
        renderProducts();
    }

    function changeQuantity(index, amount) {
        if (products[index].quantity + amount > 0) {
            products[index].quantity += amount;
            renderProducts();
        }    }

    function editProductName(index, newName) {
        if (newName) {
            if (products.some((product, i) => i !== index && product.name.toLowerCase() === newName.toLowerCase())) {
                alert('Продукт з таким іменем вже існує.');
            } else {
                products[index].name = newName;
                renderProducts();
            }
        } else {
            alert('Назва продукту не може бути порожньою.');
        }
    }

    // Event listeners
    addButton.addEventListener('click', (e) => {
        addProduct();
    });

    productNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addProduct();
        }
    });

    // Initial render
    renderProducts();
});
