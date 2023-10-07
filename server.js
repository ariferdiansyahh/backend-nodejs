const express = require('express');
const mongoose = require('./config/database'); // Impor modul koneksi MongoDB
const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk penguraian permintaan JSON
app.use(express.json());

// Mengimpor rute pengguna
const userRoutes = require('./routes/userRoutes');

// Gunakan rute pengguna dengan awalan /users
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Selamat datang di Mikro Layanan Pengguna!');
});

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
