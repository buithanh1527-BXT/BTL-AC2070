# LỘ TRÌNH DỰ ÁN (PROJECT ROADMAP)

Bản đồ này được tạo ra dựa trên `requirement.md` và phân công công việc:
- **Backend (Node.js/Express) & Data Handling (Vanilla JS):** Bạn (Developer hiện tại)
- **Style & HTML/UI Layout (CSS thuần):** Frontend Developer khác

---

## 🚀 ROADMAP DÀNH CHO BẠN (BACKEND & JS DATA HANDLING)

### ✅ Phase 1: Khởi tạo & Cấu hình cơ bản (Đã hoàn thành)
- [x] Khởi tạo cấu trúc thư mục (controllers, routes, views, public).
- [x] Lên lược đồ Database MySQL (`users`, `books`, `comments`, `borrow_records`).
- [x] Cấu hình Express Server cơ bản (`server.js`).

### ✅ Phase 2: Xác thực & Phân quyền (Authentication) - V2 (Đã hoàn thành)

- [x] **Backend:** Hoàn thiện API Đăng ký, Đăng nhập (băm mật khẩu với module crypto/bcrypt) và xử lý phân quyền (Admin/User). Cập nhật V2: Lưu token vào DB.
- [x] **JS Data:** Xử lý form submit ở `login.html` và `register.html`, gọi API `fetch`, lưu token/session.

### ✅ Phase 3: Quản lý & Hiển thị sách (Books) - V2 (Đã hoàn thành)

- [x] **Backend:** API lấy danh sách sách (`GET /books`) và API chi tiết 1 cuốn sách (`GET /books/:id`). Cập nhật V2: Pagination, Search, Soft Delete.
- [x] **JS Data:** Gọi API lấy dữ liệu và render nội dung động vào trang chủ (đã có khung ở `main.js`) và trang chi tiết sách (`book-detail.html`).

### ✅ Phase 4: Bình luận & Đánh giá (Comments) (Đã hoàn thành)

- [x] **Backend:** API xử lý nhận form bình luận và lưu vào Database; API lấy bình luận theo sách.
- [x] **JS Data:** Bắt sự kiện submit form bình luận ở trang chi tiết sách, gọi API và render ngay lập tức bình luận xuống phía dưới.

### ✅ Phase 5: Quản trị (Admin Dashboard) - V2 (Đã hoàn thành)

- [x] **Backend:** API thống kê tổng lượt view, API CRUD sách (Upload Base64), API xoá bình luận, API quản lý mượn/trả (Ràng buộc 3 cuốn, nợ phạt).
- [x] **JS Data:** Gọi API để đổ dữ liệu vào trang `admin.html` và gắn sự kiện cho các nút Xóa, Sửa, Duyệt mượn trả sách. Trang `profile.html` xem nợ phạt.

### ✅ Phase 6: Logic Popup & Cookie (Đã hoàn thành)
- [x] **JS Data:** Đã hoàn thiện logic hẹn giờ 1 phút (`setTimeout`) và lưu trạng thái vào `cookie` trong `main.js`.

---

## 🎨 ROADMAP DÀNH CHO FRONTEND DEVELOPER KHÁC (STYLE / UI)

### ⏳ Phase 7: Giao diện và CSS Responsive
- [ ] **HTML Layout:** Chuẩn hoá các thẻ cấu trúc cho `index.html`, `admin.html`, `book-detail.html`.
- [ ] **CSS Styling:** Làm đẹp trang web bằng CSS thuần (Tuyệt đối không dùng framework).
- [ ] **Responsive Design:** Viết `@media query` cho 3 ngưỡng màn hình: Mặc định, `1200px` và `800px` trong file `style.css`.
