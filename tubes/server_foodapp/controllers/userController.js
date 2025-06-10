const db = require('../db');

// Get all users
exports.getAll = (req, res) => {
    db.query('SELECT * FROM user', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

// Get user by id
exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "User not found" });
        res.json(results[0]);
    });
};

// Register new user
exports.create = (req, res) => {
    const { name, email, password, table_number } = req.body;
    if (!name || !email || !password || !table_number) {
        return res.status(400).json({ message: "Data incomplete" });
    }
    db.query(
        'INSERT INTO user (name, email, password, table_number) VALUES (?, ?, ?, ?)',
        [name, email, password, table_number],
        (err, result) => {
            if (err) return res.status(500).json({ message: err.message });
            res.status(201).json({ id: result.insertId, name, email, table_number });
        }
    );
};