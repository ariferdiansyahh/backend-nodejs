require("dotenv").config(); 
const mongoose = require('mongoose');

const url = process.env.MONGODB_URL
mongoose.connect( url , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Koneksi MongoDB gagal:'));
db.once('open', () => {
    console.log('Terhubung ke MongoDB');
});

module.exports = mongoose; // Ekspor instance mongoose
