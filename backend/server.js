const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Отдаем статику из папки frontend
app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/assets', express.static(path.join(__dirname, '../frontend/assets')));
// Добавляем обработку корневого пути assets
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// API для получения списка товаров
app.get('/products', (req, res) => {
  const filePath = path.join(__dirname, '../data/products.json');
  console.log(`Читаем файл: ${filePath}`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Ошибка чтения файла:', err);
      return res.status(500).json({ error: 'Не удалось прочитать данные' });
    }
    try {
      const products = JSON.parse(data);
      res.json(products);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      res.status(500).json({ error: 'Ошибка парсинга JSON' });
    }
  });
});

// Отдаём index.html при открытии /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Обработка 404 (если ресурс не найден)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '../frontend/404.html'));
});

app.listen(PORT, () => {
  console.log(`Frontend сервер запущен на порту ${PORT}`);
});
