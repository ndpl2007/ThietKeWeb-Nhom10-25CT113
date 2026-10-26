# Giải Thích Logic Lấy Thời Gian Bằng `new Date().getHours()`

Tài liệu này giải thích chi tiết cách hoạt động của đoạn mã JavaScript hiển thị thông báo chào mừng theo thời gian thực trong trang web thuộc **Buổi 8 - Môn Thiết kế Web**. Toàn bộ logic đã được tách riêng vào file [greeting.js] và liên kết ngoài vào [index.html].

---

## 1. Mục tiêu bài toán

Khi người dùng mở hoặc tải lại trang web, hệ thống tự động:
1. Lấy thông tin thời gian thực từ thiết bị người dùng.
2. Trích xuất chỉ số giờ hiện tại trong ngày.
3. So sánh giờ với các khung thời gian để xác định lời chào phù hợp:
   - **Buổi sáng (từ 05:00 đến trước 12:00)**: `"Chào buổi sáng!"`
   - **Buổi chiều (từ 12:00 đến trước 18:00)**: `"Chào buổi chiều!"`
   - **Buổi tối / đêm (các khung giờ còn lại)**: `"Chào buổi tối!"`
4. Hiển thị thông báo dạng hộp thoại (`alert()`) ngay khi người dùng truy cập trang.

---

## 2. Tìm hiểu chi tiết về `new Date().getHours()`

Cú pháp `new Date().getHours()` kết hợp giữa việc khởi tạo đối tượng thời gian và gọi phương thức trích xuất dữ liệu:

### 2.1. Khởi tạo đối tượng thời gian: `new Date()`
- `Date` là một đối tượng tích hợp sẵn (built-in object) của JavaScript để xử lý ngày tháng và thời gian.
- Từ khóa `new` dùng để khởi tạo một thể hiện (instance) của đối tượng `Date`.
- Khi không truyền tham số, `new Date()` tự động lấy mốc **ngày và giờ chính xác tại thời điểm thực thi** dựa theo đồng hồ hệ thống trên máy khách (Client).

### 2.2. Phương thức trích xuất giờ: `.getHours()`
- `getHours()` là một phương thức của đối tượng `Date`.
- Phương thức này trả về **giờ hiện tại** dưới dạng số nguyên (từ `0` đến `23`) theo định dạng 24 giờ của múi giờ địa phương:
  - `0`: 12 giờ đêm (00:00)
  - `6`: 6 giờ sáng
  - `12`: 12 giờ trưa
  - `15`: 3 giờ chiều
  - `22`: 10 giờ đêm
- Kiểu dữ liệu trả về: **Number (Số nguyên)**.

### 2.3. Kỹ thuật gọi nối chuỗi (Method Chaining)
Thay vì khai báo 2 dòng:
```javascript
const now = new Date();             // 1. Tạo đối tượng Date
const currentHour = now.getHours(); // 2. Lấy giờ từ đối tượng
```
Ta viết gộp nối tiếp:
```javascript
const currentHour = new Date().getHours();
```
Cách viết này gọn gàng hơn, không cần tạo thêm biến trung gian không cần thiết.

---

## 3. Cấu trúc logic điều kiện (Conditional Logic)

Dựa trên giá trị `currentHour` (từ `0` đến `23`), ta sử dụng cấu trúc rẽ nhánh `if...else if...else`:

| Khung giờ trong ngày | Điều kiện kiểm tra (`currentHour`) | Lời chào hiển thị |
| :--- | :--- | :--- |
| **05:00 - 11:59** | `currentHour >= 5 && currentHour < 12` | `"Chào buổi sáng!"` |
| **12:00 - 17:59** | `currentHour >= 12 && currentHour < 18` | `"Chào buổi chiều!"` |
| **18:00 - 04:59 hôm sau** | Trường hợp còn lại (`else`) | `"Chào buổi tối!"` |

---

## 4. Tách mã JavaScript thành file riêng (`greeting.js`)

### 4.1. Tại sao tách riêng thành file `greeting.js`?
- **Tách biệt mối quan tâm (Separation of Concerns):** Giữ cấu trúc HTML trong `index.html` sạch sẽ, không bị trộn lẫn giữa mã cấu trúc và mã logic.
- **Dễ bảo trì và quản lý:** Mỗi file phụ trách một nhiệm vụ chuyên biệt (`greeting.js` xử lý chào mừng & tương tác, `services.js` xử lý danh sách dịch vụ).
- **Tối ưu bộ nhớ đệm (Browser Caching):** Trình duyệt lưu cache file `.js` sau lần tải đầu, giúp các lần mở trang tiếp theo nhanh hơn.

### 4.2. Mã nguồn hoàn chỉnh trong file `greeting.js`

```javascript
// ============================================================
// greeting.js - THÔNG BÁO CHÀO MỪNG THEO THỜI GIAN THỰC
// ============================================================

// 1. Lấy giờ hiện tại từ hệ thống (giá trị từ 0 đến 23)
const currentHour = new Date().getHours();
let greeting = "";

// 2. Phân loại lời chào theo từng khung giờ trong ngày
if (currentHour >= 5 && currentHour < 12) {
  greeting = "Chào buổi sáng!";
} else if (currentHour >= 12 && currentHour < 18) {
  greeting = "Chào buổi chiều!";
} else {
  greeting = "Chào buổi tối!";
}

// 3. Hiển thị hộp thoại thông báo chào mừng người dùng
alert(greeting);


// ============================================================
// HIỆU ỨNG ẨN/HIỆN NÚT LIÊN HỆ NỔI (FLOATING CONTACT)
// ============================================================
const floatingContact = document.querySelector(".floating-contact");
const footer = document.querySelector("body > footer");

if (floatingContact && footer && "IntersectionObserver" in window) {
  const footerObserver = new IntersectionObserver(
    ([entry]) => {
      floatingContact.classList.toggle("is-hidden", entry.isIntersecting);
    },
    { threshold: 0.1 }
  );

  footerObserver.observe(footer);
}
```

### 4.3. Cách nhúng vào file `index.html`
Tại cuối trang `index.html`, trước thẻ đóng `</body>`, ta nhúng file qua thẻ `<script src="...">`:

```html
  <!-- Thông báo chào mừng theo thời gian thực -->
  <script src="greeting.js"></script>
</body>
</html>
```

---

## 5. Hướng dẫn kiểm thử (Testing)

1. **Kiểm tra thực tế:**
   - Mở file `index.html` trên trình duyệt.
   - Hộp thoại `alert` sẽ xuất hiện ngay lập tức với lời chào tương ứng với giờ trên máy tính của bạn.

2. **Kiểm tra các khung giờ qua DevTools Console (F12):**
   - Bấm `F12` -> mở tab **Console**.
   - Dán đoạn hàm test sau để kiểm tra kết quả trả về của các mốc giờ:
     ```javascript
     function getTestGreeting(hour) {
       if (hour >= 5 && hour < 12) return "Chào buổi sáng!";
       if (hour >= 12 && hour < 18) return "Chào buổi chiều!";
       return "Chào buổi tối!";
     }

     console.log("8h sáng:", getTestGreeting(8));   // Kết quả: Chào buổi sáng!
     console.log("14h chiều:", getTestGreeting(14)); // Kết quả: Chào buổi chiều!
     console.log("21h tối:", getTestGreeting(21));  // Kết quả: Chào buổi tối!
     console.log("2h đêm:", getTestGreeting(2));    // Kết quả: Chào buổi tối!
     ```
