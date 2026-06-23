const pool = require('../config/database');

exports.getAllBooks = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM books ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        // Tăng view_count
        await pool.query('UPDATE books SET view_count = view_count + 1 WHERE id = ?', [bookId]);
        
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ?', [bookId]);
        if (rows.length === 0) return res.status(404).json({ message: 'Book not found' });
        
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
