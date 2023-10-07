const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


// Middleware untuk memeriksa token JWT
const verifyToken = userController.verifyToken;

router.post('/login', userController.generateToken);
// Rute untuk menambahkan pengguna baru
router.post('/add', verifyToken, userController.addUser);
// Rute untuk mengedit pengguna berdasarkan ID
router.put('/edit/:id', verifyToken, userController.editUser);
// Rute untuk delete pengguna berdasarkan ID
router.delete('/delete/:id', verifyToken, userController.deleteUser);
// Rute untuk mendapatkan pengguna berdasarkan accountNumber
router.get('/account/:accountNumber', verifyToken, userController.getUserByAccountNumber);
// Rute untuk mendapatkan pengguna berdasarkan identityNumber
router.get('/identity/:identityNumber', verifyToken, userController.getUserByIdentityNumber);

module.exports = router;