-- DỮ LIỆU MẪU (SEEDER) CHO DATABASE V2

-- Bảng: users
INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `session_token`) VALUES (1, 'admin', '$2b$10$PBQiQqm6P7ej.WXDSU7RGu.KzY6wc6udWP7dpp6/ikSwCWCfnMDpS', 'admin', '2026-06-25 12:14:49', '669b2e869b5c24254b350ae62cc6a154');
INSERT INTO `users` (`id`, `username`, `password`, `role`, `created_at`, `session_token`) VALUES (2, 'student1', '$2b$10$jPg/hDwhzdykoV60fiMKteITNaeIsFgCJotCoBsce7lCTGZQ369Tq', 'user', '2026-06-25 12:14:49', '0f4921f0f55b4b85a2cf27af9d465b66');

-- Bảng: books
INSERT INTO `books` (`id`, `title`, `author`, `description`, `view_count`, `status`, `created_at`, `total_copies`, `available_copies`, `is_deleted`, `cover_image`) VALUES (1, 'Sách Lập trình JS', 'Nxb ABC', 'Học JS cơ bản', 0, 'available', '2026-06-25 12:14:50', 5, 4, 0, NULL);
INSERT INTO `books` (`id`, `title`, `author`, `description`, `view_count`, `status`, `created_at`, `total_copies`, `available_copies`, `is_deleted`, `cover_image`) VALUES (2, 'Sách Node.js', 'Nxb XYZ', 'Học Node.js Server', 0, 'available', '2026-06-25 12:14:50', 2, 2, 0, NULL);
INSERT INTO `books` (`id`, `title`, `author`, `description`, `view_count`, `status`, `created_at`, `total_copies`, `available_copies`, `is_deleted`, `cover_image`) VALUES (3, 'Sách Cơ sở dữ liệu', 'Nxb ĐH', 'Học MySQL', 0, 'available', '2026-06-25 12:14:50', 1, 1, 0, NULL);

-- Bảng: borrow_records
INSERT INTO `borrow_records` (`id`, `user_id`, `book_id`, `borrow_date`, `return_date`, `status`, `created_at`, `due_date`, `penalty_fee`) VALUES (1, 2, 1, '2026-06-24 17:00:00', NULL, 'borrowed', '2026-06-25 12:14:50', '2026-07-08 17:00:00', 0);
INSERT INTO `borrow_records` (`id`, `user_id`, `book_id`, `borrow_date`, `return_date`, `status`, `created_at`, `due_date`, `penalty_fee`) VALUES (2, 2, 2, '2026-06-24 17:00:00', NULL, 'rejected', '2026-06-25 12:14:50', NULL, 0);

