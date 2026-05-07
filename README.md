# 📚 Book Store E-Commerce Application

A full-stack Book Store E-Commerce web application developed using **React.js**, **Node.js**, **Express.js**, and **MySQL**.

This application provides complete functionality for:

- User Authentication
- Role-Based Access Control (Admin/User)
- Book Management
- Cart System
- Orders & Payments
- User Profile Management
- Contact System

---

# 🚀 Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- React Bootstrap
- React Hook Form
- Yup Validation
- React Toastify

## Backend
- Node.js
- Express.js
- MySQL
- JWT Authentication
- bcrypt Password Hashing

---

# ✨ Features

## 👤 User Features
- User Registration
- User Login
- View Books
- Search Books
- Add to Cart
- View Cart
- Remove Cart Items
- Place Orders
- Cancel Orders
- Make Payments
- Update Profile
- Send Contact Messages

## 👨‍💼 Admin Features
- Admin Login
- Add Books
- Update Books
- Delete Books
- View All Users

---

# 📁 Project Structure

```bash
BookStoreEcommerce/
│
├── backend/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   ├── config/
│   ├── services/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   ├── validation/
│   │   └── App.jsx
│
└── README.md
```

---

# ⚙️ Backend Setup

## Step 1: Initialize Backend

```bash
npm init -y
```

---

## Step 2: Install Backend Packages

```bash
npm i express mysql2
npm i bcrypt
npm i jsonwebtoken
npm i cors
```

---

# 🗄️ Database Setup (MySQL)

## Create Database

```sql
CREATE DATABASE bookStore;
```

---

# 📋 Database Tables

## users

```sql
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
---
Only one admin .So insert manually
INSERT INTO users (name, email, password, role)
VALUES ('Admin', 'admin@bookstore.com', '$2b$10$VDMEne8roOgECHoWXiU0tuEJ1AZlkfpC6lJ4ve/f8LNPofnAa7gwG', 'admin');

---

## books

```sql
CREATE TABLE books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150),
    price DECIMAL(10,2) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## cart

```sql
CREATE TABLE cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);
```

---

## cart_items

```sql
CREATE TABLE cart_items (
    cart_item_id INT AUTO_INCREMENT PRIMARY KEY,
    cart_id INT,
    book_id INT,
    quantity INT DEFAULT 1,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE
);
```

---

## orders

```sql
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    total_amount DECIMAL(10,2),
    status ENUM('pending', 'paid', 'shipped', 'delivered') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
```

---

## order_items

```sql
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    book_id INT,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
```

---

## payments

```sql
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    payment_method VARCHAR(50),
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    transaction_id VARCHAR(255),
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);
```

---

## contact_messages

```sql
CREATE TABLE contact_messages(
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(150),
    subject VARCHAR(255),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

# 💻 Frontend Setup

## Install Frontend Packages

```bash
npm i axios
npm i react-router-dom
npm i react-bootstrap bootstrap
npm i react-router-bootstrap
npm i react-hook-form
npm i yup
npm i @hookform/resolvers
npm i react-toastify
```

---

# 🔐 Authentication System

This project uses:

- JWT Token Authentication
- bcrypt Password Hashing
- Protected Routes
- Role-Based Authorization

Roles:
- admin
- user

JWT token is stored in:

```javascript
localStorage
```

---

# 🔑 API Endpoints

# 1️⃣ Authentication APIs

---

## User Signup

### Endpoint

```http
POST /auth/signup
```

### Request Body

```json
{
  "name": "Sumit",
  "email": "sumit@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "insertedId": 2
}
```

---

## User/Admin Login

### Endpoint

```http
POST /auth/signin
```

### Request Body

```json
{
  "email": "sumit@gmail.com",
  "password": "123456"
}
```

### Response

```json
{
  "message": "Login Successful",
  "token": "JWT_TOKEN",
  "role": "user"
}
```

---

# 2️⃣ User APIs

## Get Profile

```http
GET /users/profile
```

### Header

```http
Authorization: Bearer JWT_TOKEN
```

---

## Update Profile

```http
PUT /users/profile
```

### Body

```json
{
  "name": "Sumit Patil"
}
```

---

# 3️⃣ Book APIs

## Add Book (Admin)

```http
POST /books
```

### Body

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "price": 499
}
```

---

## Get All Books

```http
GET /books
```

---

## Update Book

```http
PUT /books/:id
```

---

## Delete Book

```http
DELETE /books/:id
```

---

## Search Books

```http
GET /books/search/all?title=Atomic
```

OR

```http
GET /books/search/all?title=Atomic&author=James
```

---

# 4️⃣ Cart APIs

## Add To Cart

```http
POST /cart/add
```

### Body

```json
{
  "book_id": 1
}
```

---

## View Cart

```http
GET /cart
```

---

## Remove Cart Item

```http
DELETE /cart/:id
```

---

# 5️⃣ Order APIs

## Place Order

```http
POST /orders/place
```

---

## View My Orders

```http
GET /orders/my-orders
```

---

## Cancel Order

```http
DELETE /orders/:id
```

---

# 6️⃣ Payment APIs

## Make Payment

```http
POST /payments/pay
```

### Body

```json
{
  "order_id": 1
}
```

---

# 7️⃣ Admin APIs

## Get All Users

```http
GET /users/all
```

---

# 8️⃣ Contact API

## Send Contact Message

```http
POST /contact
```

### Body

```json
{
  "email": "sumit@gmail.com",
  "subject": "Book Query",
  "message": "When will Atomic Habits be available?"
}
```

---

# 🔄 Complete Execution Flow

# 🔐 SignIn Flow

```text
SignIn.jsx
    ↓
authService.js
    ↓
Backend /auth/signin
    ↓
JWT Token + Role
    ↓
localStorage
    ↓
Redirect Based On Role
```

---

# 📝 SignUp Flow

```text
SignUp.jsx
    ↓
authService.js
    ↓
POST /auth/signup
    ↓
User Stored In Database
    ↓
Redirect To SignIn
```

---

# 📚 Admin Add Book Flow

```text
AdminHome.jsx
    ↓
react-hook-form Validation
    ↓
adminService.js
    ↓
POST /books
    ↓
MySQL Insert
    ↓
Toast Success
```

---

# ✏️ Admin Update Book Flow

```text
Edit Button
    ↓
navigate("/admin/update-book/:id")
    ↓
UpdateBook.jsx
    ↓
GET /books/:id
    ↓
PUT /books/:id
```

---

# ❌ Admin Delete Book Flow

```text
Delete Button
    ↓
Modal Opens
    ↓
DELETE /books/:id
    ↓
Refresh Table
```

---

# 🔍 User Search Book Flow

```text
UserHome.jsx
    ↓
Search Form
    ↓
GET /books/search
    ↓
Filtered Books Displayed
```

---

# 🛒 Add To Cart Flow

```text
Add To Cart Button
    ↓
POST /cart/add
    ↓
Cart Updated
```

---

# 💳 Payment Flow

```text
Proceed To Payment
    ↓
POST /orders/place
    ↓
Order Created
    ↓
POST /payments/pay
    ↓
Payment Success
```

---

# 👤 Profile Update Flow

```text
Profile.jsx
    ↓
GET /users/profile
    ↓
Enable Edit
    ↓
PUT /users/profile
    ↓
Toast Success
```

---

# 📩 Contact Flow

```text
Contact.jsx
    ↓
Form Validation
    ↓
POST /contact
    ↓
Toast Success
```

---

# 🛡️ Security Features

- JWT Authentication
- Password Hashing using bcrypt
- Protected Routes
- Admin Authorization Middleware
- Role-Based Access Control

---

# 🧪 API Testing

You can test APIs using:

- Postman
- Thunder Client
- Insomnia

---

# ▶️ Run Backend

```bash
npm start
```

Backend runs on:

```bash
http://localhost:9001
```

---

# ▶️ Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# 👨‍💻 Sample Admin Credentials

```text
Email: admin@bookstore.com
Password: admin123
```

---
---
## Screenshots 

#
![alt text](<Screenshot 2026-05-07 074751.png>) !
[alt text](<Screenshot 2026-05-07 074737.png>) ![alt text](<Screenshot 2026-05-07 074725.png>) ![alt text](<Screenshot 2026-05-07 074712.png>) ![alt text](<Screenshot 2026-05-07 074654.png>) ![alt text](<Screenshot 2026-05-07 074631.png>) ![alt text](<Screenshot 2026-05-07 074616.png>) ![alt text](<Screenshot 2026-05-07 074602.png>) ![alt text](<Screenshot 2026-05-07 074530.png>) ![alt text](<Screenshot 2026-05-07 074517.png>) ![alt text](<Screenshot 2026-05-07 074501.png>) ![alt text](<Screenshot 2026-05-07 074444.png>) ![alt text](<Screenshot 2026-05-07 074432.png>) ![alt text](<Screenshot 2026-05-07 074418.png>) ![alt text](<Screenshot 2026-05-07 074404.png>) ![alt text](<Screenshot 2026-05-07 074255.png>) ![alt text](<Screenshot 2026-05-07 074242.png>) ![alt text](<Screenshot 2026-05-07 074228.png>) ![alt text](<Screenshot 2026-05-07 074214.png>) ![alt text](<Screenshot 2026-05-07 074159.png>) ![alt text](<Screenshot 2026-05-07 074144.png>) ![alt text](<Screenshot 2026-05-07 074129.png>) ![alt text](<Screenshot 2026-05-07 074110.png>) ![alt text](<Screenshot 2026-05-07 074053.png>) ![alt text](<Screenshot 2026-05-07 074014.png>) ![alt text](<Screenshot 2026-05-07 073943.png>) ![alt text](<Screenshot 2026-05-06 123534.png>) ![alt text](<Screenshot 2026-05-06 122650.png>)

# 🌟 Future Improvements

- Online Payment Gateway
- Cloud Image Upload
- Book Reviews & Ratings
- Wishlist System
- Pagination
- Email Notifications
- Order Tracking
- Docker Deployment
- Admin Dashboard Analytics

---

# 👨‍🎓 Author

## Sumit Vijay Patil

BE Computer Science Student  
Full Stack Developer  
MERN Stack Enthusiast

---

# 📄 License

This project is created for educational and learning purposes.