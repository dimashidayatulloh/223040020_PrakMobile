const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

// Rute untuk mendapatkan semua kategori
router.get('/', categoryController.getAllCategories);

// Rute untuk mendapatkan kategori berdasarkan ID
router.get('/:id', categoryController.getCategoryById);

// Rute untuk membuat kategori baru
router.post('/', categoryController.createCategory);

// Rute untuk memperbarui kategori berdasarkan ID
router.put('/:id', categoryController.updateCategory);

// Rute untuk menghapus kategori berdasarkan ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;