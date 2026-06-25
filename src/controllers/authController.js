const pool = require('../config/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
        
        if (rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        const user = rows[0];
        const passwordIsValid = await bcrypt.compare(password, user.password);
        
        if (!passwordIsValid) {
            return res.status(401).json({ message: 'Invalid Password' });
        }
        
        const token = crypto.randomBytes(16).toString('hex');
        await pool.query('UPDATE users SET session_token = ? WHERE id = ?', [token, user.id]);
        
        res.status(200).json({
            id: user.id,
            username: user.username,
            role: user.role,
            token: token
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.headers['authorization'];
        if (token) {
            const tokenStr = token.replace('Bearer ', '');
            await pool.query('UPDATE users SET session_token = NULL WHERE session_token = ?', [tokenStr]);
        }
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, role || 'user']);
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
