const db = require('../db');

// Get all orders
exports.getAll = (req, res) => {
    db.query('SELECT * FROM `order`', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Get order by id with items
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM `order` WHERE id = ?', [id], (err, orderResults) => {
        if (err) return res.status(500).json({ message: err.message });
        if (orderResults.length === 0) return res.status(404).json({ message: "Order not found" });
        db.query(
            'SELECT oi.*, f.name as food_name FROM order_item oi JOIN food f ON oi.food_id = f.id WHERE order_id = ?',
            [id],
            (err2, itemResults) => {
                if (err2) return res.status(500).json({ message: err2.message });
                const order = orderResults[0];
                order.items = itemResults;
                res.json(order);
            }
        );
    });
};

// Create new order
exports.create = (req, res) => {
    const { user_id, items } = req.body;
    if (!user_id || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Data incomplete" });
    }
    db.query(
        'SELECT id, price, stock FROM food WHERE id IN (?)',
        [items.map(i => i.food_id)],
        (err, foods) => {
            if (err) return res.status(500).json({ message: err.message });
            let total = 0;
            for (const item of items) {
                const food = foods.find(f => f.id == item.food_id);
                if (!food) return res.status(400).json({ message: `Food id ${item.food_id} not found` });
                if (food.stock < item.quantity) return res.status(400).json({ message: `Stock for food id ${item.food_id} insufficient` });
                total += food.price * item.quantity;
            }
            db.query(
                'INSERT INTO `order` (user_id, total, date, status) VALUES (?, ?, CURDATE(), ?)',
                [user_id, total, 'pending'],
                (err2, result) => {
                    if (err2) return res.status(500).json({ message: err2.message });
                    const orderId = result.insertId;
                    const orderItems = items.map(i => [orderId, i.food_id, i.quantity, foods.find(f => f.id == i.food_id).price]);
                    db.query(
                        'INSERT INTO order_item (order_id, food_id, quantity, price) VALUES ?',
                        [orderItems],
                        (err3) => {
                            if (err3) return res.status(500).json({ message: err3.message });
                            for (const item of items) {
                                db.query(
                                    'UPDATE food SET stock = stock - ? WHERE id = ?',
                                    [item.quantity, item.food_id]
                                );
                            }
                            res.status(201).json({ id: orderId, user_id, total, status: 'pending', items });
                        }
                    );
                }
            );
        }
    );
};