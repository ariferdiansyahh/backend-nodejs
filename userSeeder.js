const User = require('./models/user');
const mongoose = require('./config/database');
const users = [
    {
        userName: 'admin',
        accountNumber: '12345',
        emailAddress: 'admin@admin.com',
        identityNumber: 'ID12345',
    },
    {
        userName: 'ari ferdiansyah',
        accountNumber: '67890',
        emailAddress: 'ari@example.com',
        identityNumber: 'ID67890',
    },
    // Tambahkan data lainnya sesuai kebutuhan
];

User.insertMany(users)
    .then(() => {
        console.log('Seeder berhasil dijalankan. Data berhasil dimasukkan.');
        mongoose.connection.close(); // Tutup koneksi ke MongoDB
    })
    .catch((error) => {
        console.error('Terjadi kesalahan saat menjalankan seeder:', error);
        mongoose.connection.close(); // Tutup koneksi ke MongoDB dengan kesalahan
    });