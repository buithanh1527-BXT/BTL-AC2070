const pool = require('../config/database');

exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'No token provided' });
    
    const tokenStr = token.replace('Bearer ', '');
    try {
        const [rows] = await pool.query('SELECT id, username, role FROM users WHERE session_token = ?', [tokenStr]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        
        req.user = rows[0];
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Require Admin Role' });
    }
};
