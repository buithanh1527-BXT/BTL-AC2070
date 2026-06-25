const pool = require('../config/database');

exports.getAllBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 8;
        const offset = (page - 1) * limit;
        const search = req.query.q || '';

        let query = 'SELECT * FROM books WHERE is_deleted = 0';
        let queryParams = [];

        if (search) {
            query += ' AND (title LIKE ? OR author LIKE ?)';
            queryParams.push(`%${search}%`, `%${search}%`);
        }

        const countQuery = query.replace('SELECT *', 'SELECT COUNT(*) as total');
        const [countResult] = await pool.query(countQuery, queryParams);
        const totalItems = countResult[0].total;

        query += ' ORDER BY id DESC LIMIT ? OFFSET ?';
        queryParams.push(limit, offset);

        const [rows] = await pool.query(query, queryParams);
        
        res.json({
            data: rows,
            pagination: {
                page,
                limit,
                totalItems,
                totalPages: Math.ceil(totalItems / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        // Tăng view_count
        await pool.query('UPDATE books SET view_count = view_count + 1 WHERE id = ? AND is_deleted = 0', [bookId]);
        
        const [rows] = await pool.query('SELECT * FROM books WHERE id = ? AND is_deleted = 0', [bookId]);
        if (rows.length === 0) return res.status(404).json({ message: 'Book not found or deleted' });
        
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
