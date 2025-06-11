const db = require('../db');

// Controller untuk mendapatkan semua item order
exports.getAllOrderItems = (req, res) => {
    db.query('SELECT * FROM order_item', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Controller untuk mendapatkan item order berdasarkan ID
exports.getOrderItemById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM order_item WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.json(results[0]);
    });
};

// Controller untuk membuat item order baru
exports.createOrderItem = (req, res) => {
    const { order_id, food_id, quantity, price } = req.body;

    // Validasi input
    if (!order_id || !food_id || !quantity || !price) {
        return res.status(400).json({ message: 'All fields (order_id, food_id, quantity, price) are required' });
    }

    db.query(
        'INSERT INTO order_item (order_id, food_id, quantity, price) VALUES (?, ?, ?, ?)',
        [order_id, food_id, quantity, price],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            res.status(201).json({ id: results.insertId, order_id, food_id, quantity, price });
        }
    );
};

// Controller untuk memperbarui item order berdasarkan ID
exports.updateOrderItem = (req, res) => {
    const { id } = req.params;
    const { order_id, food_id, quantity, price } = req.body;

    // Validasi input
    if (!order_id || !food_id || !quantity || !price) {
        return res.status(400).json({ message: 'All fields (order_id, food_id, quantity, price) are required' });
    }

    db.query(
        'UPDATE order_item SET order_id = ?, food_id = ?, quantity = ?, price = ? WHERE id = ?',
        [order_id, food_id, quantity, price, id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({ message: 'Order item not found' });
            }
            res.json({ message: 'Order item updated successfully' });
        }
    );
};

// Controller untuk menghapus item order berdasarkan ID
exports.deleteOrderItem = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM order_item WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Order item not found' });
        }
        res.json({ message: 'Order item deleted successfully' });
    });
};