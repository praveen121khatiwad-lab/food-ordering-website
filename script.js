let cartCount = 0;

const menuItems = [
  { 
    id: 1, 
    name: "Classic Burger", 
    price: 8.99, 
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80" 
  },
  { 
    id: 2, 
    name: "Pepperoni Pizza", 
    price: 12.99, 
    image: "https://images.unsplash.com/photo-1513104890d38-7c0f4749419b?w=500&q=80" 
  },
  { 
    id: 3, 
    name: "Creamy Pasta", 
    price: 10.99, 
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=500&q=80" 
  }
];

function renderMenu() {
    const container = document.getElementById('menu-container');
    container.innerHTML = '';
    
    menuItems.forEach(item => {
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

renderMenu();
