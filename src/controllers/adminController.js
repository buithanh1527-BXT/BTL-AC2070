const pool = require('../config/database');

exports.getStats = async (req, res) => {
    try {
        const [viewRows] = await pool.query('SELECT SUM(view_count) as total_views FROM books');
        const [bookRows] = await pool.query('SELECT COUNT(*) as total_books FROM books');
        const [commentRows] = await pool.query('SELECT COUNT(*) as total_comments FROM comments');
        
        res.json({
            total_views: viewRows[0].total_views || 0,
            total_books: bookRows[0].total_books || 0,
            total_comments: commentRows[0].total_comments || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.*, b.title as book_title 
            FROM comments c 
            JOIN books b ON c.book_id = b.id 
            ORDER BY c.created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM comments WHERE id = ?', [id]);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllBorrowRecords = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT r.*, u.username, b.title as book_title 
            FROM borrow_records r
            JOIN users u ON r.user_id = u.id
            JOIN books b ON r.book_id = b.id
            ORDER BY r.created_at DESC
        `);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBorrowStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;
        
        await pool.query('UPDATE borrow_records SET status = ?, return_date = IF(?="returned", CURRENT_DATE, return_date) WHERE id = ?', [status, status, id]);
        
        // Cập nhật lại status của book
        const [record] = await pool.query('SELECT book_id FROM borrow_records WHERE id = ?', [id]);
        if (record.length > 0) {
            const bookStatus = status === 'returned' ? 'available' : 'borrowed';
            await pool.query('UPDATE books SET status = ? WHERE id = ?', [bookStatus, record[0].book_id]);
        }
        
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, author, description, status } = req.body;
        await pool.query('INSERT INTO books (title, author, description, status) VALUES (?, ?, ?, ?)', [title, author, description, status || 'available']);
        res.status(201).json({ message: 'Book added' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateBook = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, author, description, status } = req.body;
        await pool.query('UPDATE books SET title=?, author=?, description=?, status=? WHERE id=?', [title, author, description, status, id]);
        res.json({ message: 'Book updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const id = req.params.id;
        await pool.query('DELETE FROM books WHERE id = ?', [id]);
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
