-- 1. Tạo bảng Categories (Thể loại sách)
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Tạo bảng trung gian Book_Categories
CREATE TABLE IF NOT EXISTS book_categories (
    book_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (book_id, category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Cập nhật bảng Users: Thêm cột lưu trữ Token thay thế cho RAM
ALTER TABLE users 
ADD COLUMN session_token VARCHAR(255) DEFAULT NULL;

-- 4. Cập nhật bảng Books: Quản lý số lượng, Soft Delete và Ảnh bìa
ALTER TABLE books 
ADD COLUMN total_copies INT DEFAULT 1,
ADD COLUMN available_copies INT DEFAULT 1,
ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE,
ADD COLUMN cover_image VARCHAR(255) DEFAULT NULL;

-- 5. Đồng bộ dữ liệu cũ (tuỳ chọn): 
-- Những sách đang có trạng thái 'borrowed' thì set available_copies = 0
UPDATE books SET available_copies = 0 WHERE status = 'borrowed';
