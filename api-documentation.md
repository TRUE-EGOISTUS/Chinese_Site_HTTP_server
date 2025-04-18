# API Documentation для Админ-панели интернет-магазина

## Base URL
`http://localhost:8080`

## Endpoints

### 1. Получение всех товаров
```http
GET /products
```
**Response:**
- Status: 200 OK
- Content-Type: application/json
```json
[
  {
    "id": number,
    "name": string,
    "price": number,
    "description": string,
    "categories": string[],
    "image": string
  }
]
```

### 2. Добавление товара
```http
POST /products
```
**Request Body:**
```json
{
  "name": string,
  "price": number,
  "description": string,
  "categories": string[],
  "image": string
}
```
**Response:**
- Status: 201 Created
```json
{
  "message": "Товар(ы) добавлены",
  "products": [/* массив добавленных товаров */]
}
```

### 3. Редактирование товара
```http
PUT /products/{id}
```
**Parameters:**
- `id`: ID товара (number)

**Request Body:**
```json
{
  "name": string,
  "price": number,
  "description": string,
  "categories": string[],
  "image": string
}
```
**Response:**
- Status: 200 OK
```json
{
  "message": "Товар обновлен",
  "product": {/* обновленный товар */}
}
```

### 4. Удаление товара
```http
DELETE /products/{id}
```
**Parameters:**
- `id`: ID товара (number)

**Response:**
- Status: 200 OK
```json
{
  "message": "Товар удален"
}
```

## Коды ошибок
- `400 Bad Request`: Неверный формат данных
- `404 Not Found`: Товар не найден
- `500 Internal Server Error`: Ошибка сервера