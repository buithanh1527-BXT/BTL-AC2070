const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/views', express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'views', 'index.html')));
app.get('/login', (req, res) => res.sendFile(path.join(__dirname, 'views', 'login.html')));
app.get('/register', (req, res) => res.sendFile(path.join(__dirname, 'views', 'register.html')));
app.get('/book-detail', (req, res) => res.sendFile(path.join(__dirname, 'views', 'book-detail.html')));
app.get('/admin', (req, res) => res.sendFile(path.join(__dirname, 'views', 'admin.html')));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/books', require('./src/routes/bookRoutes'));
app.use('/api/comments', require('./src/routes/commentRoutes'));
app.use('/api/admin', require('./src/routes/adminRoutes'));

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
