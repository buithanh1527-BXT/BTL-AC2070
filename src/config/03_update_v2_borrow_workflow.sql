-- Cập nhật bảng borrow_records để hỗ trợ luồng Pending -> Borrowed -> Returned
ALTER TABLE borrow_records
MODIFY COLUMN status ENUM('pending', 'borrowed', 'returned', 'rejected') DEFAULT 'pending',
ADD COLUMN due_date DATE DEFAULT NULL,
ADD COLUMN penalty_fee INT DEFAULT 0;
