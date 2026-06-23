const pool = require('../config/database');

exports.getCommentsByBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const [rows] = await pool.query('SELECT * FROM comments WHERE book_id = ? ORDER BY created_at DESC', [bookId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addComment = async (req, res) => {
    try {
        const { book_id, username, email, content, rating } = req.body;
        await pool.query(
            'INSERT INTO comments (book_id, username, email, content, rating) VALUES (?, ?, ?, ?, ?)',
            [book_id, username, email, content, rating]
        );
        res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
