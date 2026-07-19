let cart = [];
let currentCategory = 'All';
let searchQuery = '';

const menuItems = [
    { id: 1, name: "Classic Burger", category: "Burger", price: 8.99, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" },
    { id: 2, name: "Double Cheese Burger", category: "Burger", price: 12.99, image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=500&q=80" },
    { id: 4, name: "Pepperoni Pizza", category: "Pizza", price: 14.99, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80" },
    { id: 4, name: "Pepperoni Pizza", category: "Pizza", price: 14.99, image: "https://images.unsplash.com/photo-1513104890d38-7c0f4749419b?w=500&q=80" },
    { id: 5, name: "Veggie Supreme Pizza", category: "Pizza", price: 13.99, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80" },
    { id: 6, name: "Margherita Pizza", category: "Pizza", price: 11.99, image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=500&q=80" },
    { id: 7, name: "Coca Cola", category: "Drink", price: 2.99, image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&q=80" },
    { id: 8, name: "Iced Caramel Latte", category: "Drink", price: 4.99, image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=500&q=80" },
    { id: 9, name: "Fresh Lemonade", category: "Drink", price: 3.50, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80" },
    { id: 10, name: "Chocolate Lava Cake", category: "Dessert", price: 6.99, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80" },
    { id: 11, name: "Vanilla Bean Ice Cream", category: "Dessert", price: 5.99, image: "https://images.unsplash.com/photo-1563805042-7684c8a9e9cb?w=500&q=80" },
    { id: 12, name: "Strawberry Cheesecake", category: "Dessert", price: 7.50, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80" }
];

function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    const filteredItems = menuItems.filter(item => {
        const matchesCategory = currentCategory === 'All' || item.category === currentCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filteredItems.length === 0) {
        container.innerHTML = `<h3 style="grid-column: 1/-1; text-align: center; color: #888;">No delicious food found matching your search.</h3>`;
        return;
    }

    filteredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'menu-item';
        
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-content">
                <div class="item-header">
                    <h3>${item.name}</h3>
                    <span class="badge">${item.category}</span>
                </div>
                <p class="price">$${item.price.toFixed(2)}</p>
                <button onclick="addToCart(${item.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(card);
    });
}

function filterMenu(category, btnElement) {
    currentCategory = category;
    if (btnElement) {
        document.querySelectorAll('.cat-btn').forEach(btn => btn.classList.remove('active'));
        btnElement.classList.add('active');
    }
    renderMenu();
}

function handleSearch(event) {
    searchQuery = event.target.value;
    renderMenu();
}

function addToCart(id) {
    const item = menuItems.find(i => i.id === id);
    const existingItem = cart.find(i => i.id === id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    
    updateCartUI();
}

function updateQuantity(id, change) {
    const itemIndex = cart.findIndex(i => i.id === id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    document.getElementById('cart-count').textContent = totalCount;
    document.getElementById('cart-total').textContent = totalPrice.toFixed(2);
    
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty. Add some tasty food!</p>';
        return;
    }
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>$${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div class="cart-controls">
                <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span>${item.quantity}</span>
                <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });
}

function toggleCart(show) {
    document.getElementById('cart-modal').style.display = show ? 'flex' : 'none';
    if (show) updateCartUI();
}

function checkout() {
    if (cart.length === 0) {
        alert("Please add some food to your cart before checking out!");
        return;
    }
    cart = [];
    updateCartUI();
    toggleCart(false);
    document.getElementById('success-modal').style.display = 'flex';
}

function closeSuccessModal() {
    document.getElementById('success-modal').style.display = 'none';
}

renderMenu();
