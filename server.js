const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets with caching headers for performance optimization
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d'
}));

// Helper to load products data
const getProducts = () => {
  const filePath = path.join(__dirname, 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

// Route: Home / Catalog Page
app.get('/', (req, res) => {
  const products = getProducts();
  const categories = [...new Set(products.map(p => p.category))];
  res.render('index', { products, categories });
});

// Route: Single Product Detail Page
app.get('/product/:id', (req, res) => {
  const products = getProducts();
  const product = products.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).render('index', { 
      products: [], 
      categories: [], 
      error: 'Product Not Found' 
    });
  }
  
  res.render('product', { product });
});

// API Route: Client-side filtering endpoint
app.get('/api/products', (req, res) => {
  let products = getProducts();
  const { category, search } = req.query;

  if (category && category !== 'all') {
    products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    const query = search.toLowerCase();
    products = products.filter(p => 
      p.title.toLowerCase().includes(query) || 
      p.description.toLowerCase().includes(query)
    );
  }

  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});