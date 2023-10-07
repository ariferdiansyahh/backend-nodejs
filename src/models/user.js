const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definisikan schema pengguna
const userSchema = new Schema({
    userName: {
        type: String,
        required: true, 
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    identityNumber: {
        type: String,
        required: true,
        unique: true,
    },
});

// Buat indeks pada accountNumber dan identityNumber
userSchema.index({ accountNumber: 1, identityNumber: 1 });

module.exports = mongoose.model('user', userSchema);
