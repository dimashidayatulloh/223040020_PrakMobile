const express = require('express');
const router = express.Router();
const orderItemController = require('../controllers/orderItemController');

// Rute untuk mendapatkan semua item order
router.get('/', orderItemController.getAllOrderItems);

// Rute untuk mendapatkan item order berdasarkan ID
router.get('/:id', orderItemController.getOrderItemById);

// Rute untuk membuat item order baru
router.post('/', orderItemController.createOrderItem);

// Rute untuk memperbarui item order berdasarkan ID
router.put('/:id', orderItemController.updateOrderItem);

// Rute untuk menghapus item order berdasarkan ID
router.delete('/:id', orderItemController.deleteOrderItem);

module.exports = router;