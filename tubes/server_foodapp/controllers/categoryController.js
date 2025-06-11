const db = require('../db');

// Controller untuk mendapatkan semua kategori
exports.getAllCategories = (req, res) => {
    db.query('SELECT * FROM category', (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json(results);
    });
};

// Controller untuk mendapatkan kategori berdasarkan ID
exports.getCategoryById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM category WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(results[0]);
    });
};

// Controller untuk membuat kategori baru
exports.createCategory = (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    db.query('INSERT INTO category (name) VALUES (?)', [name], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.status(201).json({ id: results.insertId, name });
    });
};

// Controller untuk memperbarui kategori berdasarkan ID
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    db.query('UPDATE category SET name = ? WHERE id = ?', [name, id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully' });
    });
};

// Controller untuk menghapus kategori berdasarkan ID
exports.deleteCategory = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM category WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    });
};