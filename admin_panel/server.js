const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 8080;

app.use(express.json());

// Разрешаем отдавать `admin.html`
app.use(express.static(path.join(__dirname)));

const productsFilePath = path.join(__dirname, '../data/products.json');

// Функция для чтения товаров
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
};

// Функция для записи товаров
const writeProducts = (products) => {
  fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2), 'utf8');
};

// Получить все товары
app.get('/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

// Добавить товар(ы)
app.post('/products', (req, res) => {
  const newProducts = Array.isArray(req.body) ? req.body : [req.body];
  if (!newProducts || newProducts.length === 0) {
    return res.status(400).json({ error: 'Нет данных для добавления' });
  }
  const products = readProducts();
  let nextId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
  newProducts.forEach(product => {
    product.id = nextId++;
    products.push(product);
  });
  writeProducts(products);
  res.status(201).json({ message: 'Товар(ы) добавлены', products: newProducts });
});

// Редактировать товар по id
app.put('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedData = req.body;
  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  products[index] = { ...products[index], ...updatedData };
  writeProducts(products);
  res.json({ message: 'Товар обновлен', product: products[index] });
});

// Удалить товар по id
app.delete('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  let products = readProducts();
  const initialLength = products.length;
  products = products.filter(p => p.id !== id);
  if (products.length === initialLength) {
    return res.status(404).json({ error: 'Товар не найден' });
  }
  writeProducts(products);
  res.json({ message: 'Товар удален' });
});

// Отдаём `admin.html` при открытии `/`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.listen(PORT, () => {
  console.log(`Админ-сервер запущен на порту ${PORT}`);
});
