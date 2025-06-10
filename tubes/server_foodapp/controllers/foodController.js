const db = require('../db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM food', (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};

exports.getById = (req, res) => {
    const id = req.params.id;
    db.query('SELECT * FROM food WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        if (results.length === 0) return res.status(404).json({ message: "Food not found" });
        res.json(results[0]);
    });
};