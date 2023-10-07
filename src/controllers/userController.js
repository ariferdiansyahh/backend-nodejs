const User = require('../models/user');

const jwt = require('jsonwebtoken');

const secretKey = 'ariferdiansyah';

exports.addUser = async (req, res) => {
    try {
        const { userName, accountNumber, emailAddress, identityNumber } = req.body;

        const newUser = new User({
            userName,
            accountNumber,
            emailAddress,
            identityNumber,
        });

        const savedUser = await newUser.save();

        res.status(201).json(savedUser);
    } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Terjadi kesalahan saat menambahkan pengguna' });
    }
};

exports.editUser = async (req, res) => {
    try {
        const userId = req.params.id; 
        const updates = req.body;
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true, // Mengembalikan data pengguna yang telah diperbarui
        });

        if (!updatedUser) {
            return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        res.status(200).json({message: 'Pengguna berhasil diupdate' , updatedUser});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mengedit pengguna' });
    }
};

// Fungsi untuk menghapus pengguna berdasarkan ID
exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; 

        const deletedUser = await User.findByIdAndRemove(userId);

        if (!deletedUser) {
        return res.status(404).json({ error: 'Pengguna tidak ditemukan' });
        }

        // Kirim respons dengan data pengguna yang telah dihapus
        res.status(200).json({ message: 'Pengguna berhasil dihapus' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghapus pengguna' });
    }
};

// Fungsi untuk mendapatkan pengguna berdasarkan accountNumber
exports.getUserByAccountNumber = async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber; 

        const user = await User.findOne({ accountNumber });

        if (!user) {
            return res.status(404).json({ error: 'Pengguna dengan accountNumber yang diberikan tidak ditemukan' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mendapatkan pengguna berdasarkan accountNumber' });
    }
};

exports.getUserByIdentityNumber = async (req, res) => {
    try {
        const identityNumber = req.params.identityNumber; 

        const user = await User.findOne({ identityNumber });

        if (!user) {
        return res.status(404).json({ error: 'Pengguna dengan identityNumber yang diberikan tidak ditemukan' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat mendapatkan pengguna berdasarkan identityNumber' });
    }
};

exports.generateToken = async (req, res) => {
    try {
        const { userName, accountNumber } = req.body;

        const user = await User.findOne({ $or: [{ userName }, { accountNumber }] });
        if (!user) {
            return res.status(401).json({ error: 'Pengguna tidak ditemukan' });
        }

        const payload = {
            userId: user._id,
            userName: user.userName,
            accountNumber: user.accountNumber,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' }); 
        
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Terjadi kesalahan saat menghasilkan token' });
    }
};

exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ error: 'Token tidak ditemukan' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token tidak valid' });
        }
        req.user = decoded;
        next(); 
    });
};

