let cartCount = 0;

async function fetchMenu() {
    try {
        const response = await fetch('/api/menu');
        const menu = await response.json();
        renderMenu(menu);
    } catch (error) {
        console.error(error);
    }
}

function renderMenu(menu) {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    menu.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.name;
        
        const title = document.createElement('h3');
        title.textContent = item.name;
        
        const price = document.createElement('p');
        price.textContent = `$${item.price}`;
        
        const btn = document.createElement('button');
        btn.textContent = 'Add to Cart';
        btn.onclick = () => addToCart(item);
        
        div.appendChild(img);
        div.appendChild(title);
        div.appendChild(price);
        div.appendChild(btn);
        
        container.appendChild(div);
    });
}

function addToCart(item) {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
}

fetchMenu();
