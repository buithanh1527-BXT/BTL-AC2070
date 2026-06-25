const pool = require('../config/database');

exports.borrowBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const userId = req.user.id;

        // 1. Kiểm tra nợ quá hạn
        const [overdue] = await pool.query('SELECT id FROM borrow_records WHERE user_id = ? AND status = "borrowed" AND CURRENT_DATE > due_date', [userId]);
        if (overdue.length > 0) return res.status(400).json({ message: 'Bạn đang có sách quá hạn chưa trả. Vui lòng trả sách trước.' });

        // 2. Kiểm tra giới hạn 3 cuốn
        const [activeBorrows] = await pool.query('SELECT id, book_id FROM borrow_records WHERE user_id = ? AND status IN ("pending", "borrowed")', [userId]);
        if (activeBorrows.length >= 3) return res.status(400).json({ message: 'Bạn chỉ được mượn tối đa 3 cuốn sách cùng lúc.' });

        // 3. Kiểm tra xem đã mượn cuốn này chưa
        if (activeBorrows.some(b => b.book_id == bookId)) return res.status(400).json({ message: 'Bạn đã mượn cuốn sách này rồi.' });

        // 4. Kiểm tra số lượng tồn kho
        const [books] = await pool.query('SELECT available_copies, is_deleted FROM books WHERE id = ?', [bookId]);
        if (books.length === 0 || books[0].is_deleted) return res.status(404).json({ message: 'Không tìm thấy sách' });
        if (books[0].available_copies <= 0) return res.status(400).json({ message: 'Sách đã hết bản sao có sẵn trong kho.' });

        // Thực hiện tạo yêu cầu mượn (pending) và giữ chỗ (trừ available_copies)
        await pool.query(
            'INSERT INTO borrow_records (user_id, book_id, borrow_date, status) VALUES (?, ?, CURRENT_DATE, ?)',
            [userId, bookId, 'pending']
        );

        await pool.query('UPDATE books SET available_copies = available_copies - 1 WHERE id = ?', [bookId]);

        res.status(201).json({ message: 'Gửi yêu cầu mượn sách thành công! Vui lòng chờ duyệt.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMyHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await pool.query(`
            SELECT r.*, b.title as book_title, b.cover_image 
            FROM borrow_records r
            JOIN books b ON r.book_id = b.id
            WHERE r.user_id = ?
            ORDER BY r.created_at DESC
        `, [userId]);
        
        const [fineRows] = await pool.query(`
            SELECT SUM(penalty_fee) as total_fines 
            FROM borrow_records 
            WHERE user_id = ?
        `, [userId]);
        
        res.json({
            history: rows,
            totalFines: fineRows[0].total_fines || 0
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
