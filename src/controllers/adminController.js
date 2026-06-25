const pool = require('../config/database');
const fs = require('fs');
const path = require('path');

exports.getStats = async (req, res) => {
    try {
        const [viewRows] = await pool.query('SELECT SUM(view_count) as total_views FROM books WHERE is_deleted = 0');
        const [bookRows] = await pool.query('SELECT COUNT(*) as total_books FROM books WHERE is_deleted = 0');
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
        
        const [record] = await pool.query('SELECT * FROM borrow_records WHERE id = ?', [id]);
        if (record.length === 0) return res.status(404).json({ message: 'Record not found' });
        const oldStatus = record[0].status;
        const bookId = record[0].book_id;
        
        if (status === 'borrowed' && oldStatus === 'pending') {
            await pool.query('UPDATE borrow_records SET status = ?, due_date = DATE_ADD(CURRENT_DATE, INTERVAL 14 DAY) WHERE id = ?', [status, id]);
        } 
        else if (status === 'returned' && oldStatus === 'borrowed') {
            await pool.query(`
                UPDATE borrow_records 
                SET status = ?, 
                    return_date = CURRENT_DATE, 
                    penalty_fee = IF(CURRENT_DATE > due_date, DATEDIFF(CURRENT_DATE, due_date) * 5000, 0)
                WHERE id = ?`, [status, id]);
            await pool.query('UPDATE books SET available_copies = available_copies + 1 WHERE id = ?', [bookId]);
        }
        else if (status === 'rejected' && oldStatus === 'pending') {
            await pool.query('UPDATE borrow_records SET status = ? WHERE id = ?', [status, id]);
            await pool.query('UPDATE books SET available_copies = available_copies + 1 WHERE id = ?', [bookId]);
        }
        
        res.json({ message: 'Status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addBook = async (req, res) => {
    try {
        const { title, author, description, total_copies, cover_image } = req.body;
        let coverUrl = null;
        
        if (cover_image && cover_image.startsWith('data:image')) {
            const base64Data = cover_image.replace(/^data:image\/\w+;base64,/, "");
            const extMatch = cover_image.match(/^data:image\/(\w+);base64,/);
            const ext = extMatch ? extMatch[1] : 'png';
            const filename = `book_${Date.now()}.${ext}`;
            const uploadPath = path.join(__dirname, '../../public/uploads', filename);
            fs.writeFileSync(uploadPath, base64Data, 'base64');
            coverUrl = `/uploads/${filename}`;
        }
        
        const copies = total_copies ? parseInt(total_copies) : 1;
        
        await pool.query(
            'INSERT INTO books (title, author, description, total_copies, available_copies, cover_image) VALUES (?, ?, ?, ?, ?, ?)', 
            [title, author, description, copies, copies, coverUrl]
        );
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
        await pool.query('UPDATE books SET is_deleted = 1 WHERE id = ?', [id]);
        res.json({ message: 'Book soft deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, username, role FROM users ORDER BY id DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { role } = req.body;
        await pool.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
        res.json({ message: 'User role updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
