const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

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

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

app.post('/api/order', (req, res) => {
  res.json({ message: "Order placed successfully", order: req.body });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
