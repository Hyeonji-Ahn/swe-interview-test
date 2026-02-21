const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'DELETE'],
  })
);

let products = [
  { id: 1, name: 'Product 1', description: 'description 1', price: 100, imageUrl: '' },
  { id: 2, name: 'Product 2', description: 'description 2', price: 200, imageUrl: '' },
  { id: 3, name: 'Product 3', description: 'description 3', price: 300, imageUrl: '' },
  { id: 4, name: 'Product 4', description: 'description 4', price: 150, imageUrl: '' },
  { id: 5, name: 'Product 5', description: 'description 5', price: 500, imageUrl: '' },
  { id: 6, name: 'Product 6', description: 'description 6', price: 50, imageUrl: '' },
  { id: 7, name: 'Product 7', description: 'description 7', price: 300, imageUrl: '' },
  { id: 8, name: 'Product 8', description: 'description 8', price: 150, imageUrl: '' },
  { id: 9, name: 'Product 9', description: 'description 9', price: 500, imageUrl: '' },
  { id: 10, name: 'Product 10', description: 'description 10', price: 50, imageUrl: '' },
];

const fetchImageUrl = () =>
  `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 100000)}`;

app.get('/api/products', (req, res) => {
  const productsWithImages = products.map((product) => ({
    ...product,
    imageUrl: product.imageUrl || fetchImageUrl(),
  }));
  products = productsWithImages;
  res.status(200).json(productsWithImages);
});

app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const existing = products.find((p) => p.id === id);

  if (!existing) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products = products.filter((p) => p.id !== id);
  res.status(200).json({ message: 'Product deleted successfully', id });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});