# TÀI LIỆU YÊU CẦU DỰ ÁN (PROJECT REQUIREMENTS)

**Tên dự án:** Website Quản lý Thư viện (Library Management System)
**Đối tượng thực hiện:** Developer mức độ Beginner
**Phương pháp phát triển:** Cuốn chiếu (Debug từng phần)

---

## 1. YÊU CẦU CÔNG NGHỆ & RÀNG BUỘC KỸ THUẬT (CONSTRAINTS)

Dự án có những ràng buộc khắt khe về việc sử dụng thư viện bên thứ ba để đảm bảo mục tiêu học tập và tuân thủ barem điểm.

- **Kiến trúc:** Phân tách Backend (RESTful API) và Frontend (Vanilla JS gọi API qua `fetch()`).
- **Backend:**
  - Sử dụng **Node.js** với framework **Express.js** (chỉ dùng cho định tuyến và tạo API).
  - Băm mật khẩu: Sử dụng module `crypto` (có sẵn của Node.js) hoặc `bcrypt`.
- **Database:**
  - Sử dụng **MySQL**.
  - Driver kết nối: `mysql2`.
- **Frontend:**
  - **BẮT BUỘC:** 100% HTML, CSS và Vanilla JavaScript (JS thuần).
  - **NGHIÊM CẤM:** Không sử dụng các thư viện UI (Bootstrap, Tailwind, jQuery) hoặc Framework (React, Vue) để tránh Penalty -10 điểm.
- **Mobile App:** Bỏ qua (Out of scope).

---

## 2. LƯỢC ĐỒ CƠ SỞ DỮ LIỆU (DATABASE SCHEMA)

Lưu trữ toàn bộ dữ liệu bằng Database MySQL với 4 bảng cốt lõi:

1.  **`users`**: Quản lý tài khoản (id, username, password đã băm, role `admin`/`user`).
2.  **`books`**: Lưu trữ sách/nội dung (id, title, author, description, view_count, status).
3.  **`comments`**: Lưu trữ đánh giá (id, book_id, username, email, content, rating).
4.  **`borrow_records`**: Lưu trữ nghiệp vụ mượn trả (id, user_id, book_id, borrow_date, return_date, status).

---

## 3. YÊU CẦU CHỨC NĂNG (FUNCTIONAL REQUIREMENTS)

### 3.1. Chức năng Hệ thống cơ bản

- **Xác thực (Authentication):** Cho phép người dùng đăng nhập, đăng xuất với `username` và `password`. Phân biệt rõ hai loại quyền: `Admin` và `User`.
- **Trang Giới thiệu & Liên hệ:** Có trang tĩnh hiển thị thông tin giới thiệu. Có Form cho phép người dùng gửi ý kiến liên hệ.

### 3.2. Chức năng Phía Người dùng (User/Client)

- **Hiển thị nội dung động:** Nội dung trang chi tiết phải thay đổi dựa trên ID hoặc mã của cuốn sách (Route/API trả dữ liệu tương ứng).
- **Bình luận & Đánh giá:**
  - Bên trong trang chi tiết sách, có Form cho phép nhập: Tên, Email, Nội dung bình luận, Điểm đánh giá.
  - Bình luận gửi thành công phải được lưu vào Database và hiển thị công khai ngay lập tức dưới cuốn sách đó.
- **Popup Quảng Cáo (Logic Cookie):**
  - Ở trang chủ, sau khi vào trang 1 phút sẽ tự động hiện một Popup quảng cáo.
  - Có nút [Đóng]. Khi người dùng nhấn đóng, hệ thống phải lưu trạng thái vào **Cookie**.
  - Lần sau người dùng reload hoặc mở lại trang chủ, đọc Cookie nếu thấy đã đóng thì **không hiển thị lại** Popup đó nữa.

### 3.3. Chức năng Phía Quản trị (Admin Dashboard)

- **Thống kê:** Hiển thị tổng số lượng View (lượt xem) của toàn bộ Website (cộng dồn từ các sách).
- **Quản lý Nội dung:** Cho phép cập nhật thông tin của các cuốn sách (thêm/sửa/xoá).
- **Quản lý Tương tác:** Cho phép xem danh sách toàn bộ bình luận của người dùng và có nút **Xoá bình luận**.
- **Quản lý Mượn/Trả (Nghiệp vụ cốt lõi):** Cập nhật trạng thái sách (Đang mượn, Đã trả).

---

## 4. YÊU CẦU PHI CHỨC NĂNG & GIAO DIỆN (UI/UX)

- **Thiết kế Giao diện (1 điểm):** Bố cục rõ ràng, sạch sẽ, trình bày hợp lý bằng CSS thuần.
- **Responsive Design (1 điểm):** Giao diện phải tự động thay đổi (co giãn, ẩn hiện phần tử) ở 3 ngưỡng màn hình khác nhau (Desktop, Tablet, Mobile) bằng `@media query`.
  - Ngưỡng 1: Màn hình lớn (Mặc định).
  - Ngưỡng 2: Màn hình vừa (`max-width: 1200px`).
  - Ngưỡng 3: Màn hình nhỏ (`max-width: 800px`).
- **Tổ chức Project (1 điểm):** Cấu trúc thư mục phải chuẩn hóa (tách biệt rõ `controllers`, `routes`, `public/css`, `public/js`, `views`).

---

## 5. LỘ TRÌNH THỰC HIỆN ĐỀ XUẤT (ROADMAP)

> Do quỹ thời gian cực kỳ hạn hẹp, tiến hành code theo nguyên tắc: **Backend/API làm đến đâu -> Dùng Postman test chuẩn JSON -> Dựng HTML/JS Frontend đến đó.**

- **Phase 1:** Khởi tạo cấu trúc thư mục, dựng Database SQL, setup Express Server cơ bản.
- **Phase 2:** Viết API + Frontend cho chức năng Đăng nhập/Đăng xuất & Phân quyền.
- **Phase 3:** Viết API + Frontend hiển thị danh sách Sách và chi tiết 1 cuốn sách.
- **Phase 4:** Tích hợp Form bình luận, đánh giá và đẩy lên Database.
- **Phase 5:** Code trang Admin (Quản lý sách, xóa bình luận, xem lượt view).
- **Phase 6:** Xử lý logic Popup với Cookie (`setTimeout` & `document.cookie`).
- **Phase 7:** Chốt hạ CSS Responsive (Viết `@media query` cho `800px` và `1200px`).
