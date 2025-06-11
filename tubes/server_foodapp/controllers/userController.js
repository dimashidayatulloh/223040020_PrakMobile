const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Replace this with your actual secret key

// Register new user
exports.create = async (req, res) => {
    const { name, email, password, table_number } = req.body;
    if (!name || !email || !password || !table_number) {
        return res.status(400).json({ message: "Data incomplete" });
    }

    try {
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO user (name, email, password, table_number) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, table_number],
            (err, result) => {
                if (err) return res.status(500).json({ message: err.message });
                res.status(201).json({ id: result.insertId, name, email, table_number });
            }
        );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        db.query('SELECT * FROM user WHERE email = ?', [email], async (err, results) => {
            if (err) return res.status(500).json({ message: err.message });
            if (results.length === 0) return res.status(401).json({ message: "Invalid email or password" });

            const user = results[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: "Invalid email or password" });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ id: user.id, name: user.name, token });
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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