# BÀI 09 – TỰ ĐỘNG HÓA VỚI VÒNG LẶP & TƯ DUY ĐÓNG GÓI VỚI HÀM

Tài liệu này giải thích chi tiết tư duy lập trình và các khối kiến thức cốt lõi được áp dụng trong file [services.js] theo đúng chuẩn nội dung **Buổi 09 - Môn Thiết kế Web**.

> [!NOTE]
> **Định vị kiến thức bài học:**
> - **Bài 09** tập trung chuyên sâu vào **JavaScript Core (Nền tảng):** Vòng lặp, Hàm, Tham số, Giá trị trả về, Phạm vi biến (Scope) và Nguyên tắc DRY trong xử lý dữ liệu.
> - **Bài 10 (bài tiếp theo):** Mới chính thức học sâu về **DOM & Event Handling** (tương tác cây DOM nâng cao, bắt sự kiện). Lệnh gán giao diện ở cuối Bài 09 chỉ đóng vai trò là "cầu nối đầu ra" (Output) để hiển thị kết quả xử lý của hàm.

---

## 1. Tổng quan bài học (Theo giáo trình)

- **Mục tiêu:** Hiểu cách dùng vòng lặp và hàm để tự động hóa thao tác lặp lại, giảm trùng lặp mã nguồn.
- **Kết quả cần đạt:** Sinh viên viết được hàm xử lý dữ liệu đơn giản và dùng vòng lặp để tạo danh sách, bảng tính hoặc kết quả lặp.

---

## 2. Phân tích chi tiết 4 ý chính của Bài 09

### Ý chính 1: Vòng lặp (Loops)
- **Lý thuyết:** Dùng `for` và `while` để lặp theo số lần hoặc theo điều kiện lặp.
- **Áp dụng trong bài:**
  Trong hàm `generateServiceListHTML(list)`, ta sử dụng vòng lặp `for` có số lần lặp xác định theo độ dài mảng dữ liệu (`list.length`):
  ```javascript
  for (let i = 0; i < list.length; i++) {
    const currentItem = list[i];
    htmlResult += createCardHTML(currentItem);
  }
  ```
  - **Tự động hóa:** Nếu danh sách có 4 dịch vụ, vòng lặp tự chạy 4 lần; nếu có 100 dịch vụ, vòng lặp tự chạy 100 lần. Ta không cần phải tự tay gõ lại từng khối thẻ HTML lặp đi lặp lại.

---

### Ý chính 2: Hàm (Functions) – Đóng gói logic
- **Lý thuyết:** Đóng gói logic bằng `function`, sử dụng **tham số (parameters)** đầu vào và **giá trị trả về (return value)** đầu ra.
- **Áp dụng trong bài:** Tách thành 2 hàm rõ ràng theo đúng tư duy module:

1. **Hàm con `createCardHTML(item)`:**
   - *Tham số:* Nhận vào 1 đối tượng dịch vụ `item`.
   - *Logic:* Dùng Template Literal ghép dữ liệu thành 1 thẻ HTML hoàn chỉnh.
   - *Giá trị trả về (`return`):* Chuỗi HTML của thẻ đó.

2. **Hàm chính `generateServiceListHTML(list)`:**
   - *Tham số:* Nhận vào mảng dữ liệu `list`.
   - *Logic:* Khởi tạo chuỗi tích lũy, chạy vòng lặp `for` qua từng phần tử, gọi hàm con để nối chuỗi.
   - *Giá trị trả về (`return`):* Toàn bộ chuỗi HTML danh sách hoàn chỉnh sau khi lặp xong (`return htmlResult;`).

---

### Ý chính 3: Scope (Phạm vi biến)
- **Lý thuyết:** Phân biệt ranh giới tồn tại và mức độ truy cập giữa **Biến toàn cục (Global Scope)** và **Biến cục bộ (Local / Function Scope)**.
- **Áp dụng trong bài:**

| Tên biến | Loại Scope | Nơi khai báo | Phạm vi hoạt động |
| :--- | :--- | :--- | :--- |
| `serviceData` | **Biến toàn cục (Global)** | Ngoài cùng file `services.js`. | Tồn tại suốt vòng đời chương trình, có thể được truy cập và tái sử dụng ở bất kỳ hàm nào. |
| `htmlResult` | **Biến cục bộ (Local Scope)** | Bên trong hàm `generateServiceListHTML`. | Chỉ sống bên trong hàm; khi hàm kết thúc, biến này tự động giải phóng khỏi bộ nhớ máy tính. |
| `i`, `currentItem` | **Biến cục bộ khối lệnh (Block Scope)** | Bên trong khối lệnh vòng lặp `for`. | Chỉ tồn tại trong từng vòng lặp `for`, hoàn toàn không gây ảnh hưởng hay xung đột tên với bên ngoài (tránh ô nhiễm biến toàn cục). |

---

### Ý chính 4: Nguyên tắc DRY (Don't Repeat Yourself)
- **Lý thuyết:** "Đừng lặp lại chính mình" – giảm thiểu trùng lặp mã nguồn bằng cách tách logic thành hàm rõ mục đích.
- **Áp dụng trong bài:**
  - **Trước khi áp dụng DRY:** Mỗi lần cần thêm 1 dịch vụ, lập trình viên phải copy-paste khối HTML và sửa text thủ công -> Dễ sai sót, khó bảo trì khi đổi giao diện.
  - **Sau khi áp dụng DRY:** Tách toàn bộ việc định dạng thẻ vào hàm `createCardHTML()`. Toàn bộ dữ liệu nằm trong mảng `serviceData`. Muốn đổi giao diện chỉ cần sửa đúng 1 nơi trong hàm, muốn thêm dịch vụ chỉ việc thêm 1 object vào mảng.

---

## 3. Toàn bộ mã nguồn file `services.js`

```javascript
// ==========================================================================
// BÀI 09 – TỰ ĐỘNG HÓA VỚI VÒNG LẶP & TƯ DUY ĐÓNG GÓI VỚI HÀM
// File: services.js
// Trọng tâm bài học: Vòng lặp (for), Hàm (function), Phạm vi (Scope), Nguyên tắc DRY
// ==========================================================================

// --------------------------------------------------------------------------
// Ý CHÍNH 3 (SCOPE): BIẾN TOÀN CỤC (GLOBAL SCOPE)
// Biến serviceData chứa mảng dữ liệu mẫu, khai báo ở phạm vi ngoài cùng của file
// --------------------------------------------------------------------------
const serviceData = [
  {
    id: 1, // Mã định danh dịch vụ
    title: "Web Development", // Tiêu đề dịch vụ
    description: "Xây dựng website hiện đại, tối ưu hiệu năng và responsive." // Mô tả dịch vụ
  },
  {
    id: 2, // Mã định danh dịch vụ
    title: "UI/UX Design", // Tiêu đề dịch vụ
    description: "Thiết kế giao diện trực quan, thẩm mỹ cao và thân thiện người dùng." // Mô tả dịch vụ
  },
  {
    id: 3, // Mã định danh dịch vụ
    title: "Mobile Development", // Tiêu đề dịch vụ
    description: "Phát triển ứng dụng di động mượt mà, đa nền tảng Android & iOS." // Mô tả dịch vụ
  },
  {
    id: 4, // Mã định danh dịch vụ
    title: "SEO Optimization", // Tiêu đề dịch vụ
    description: "Tối ưu hóa website giúp nâng cao thứ hạng trên công cụ tìm kiếm." // Mô tả dịch vụ
  }
];


// --------------------------------------------------------------------------
// Ý CHÍNH 2 (HÀM): ĐÓNG GÓI LOGIC BẰNG FUNCTION, THAM SỐ VÀ GIÁ TRỊ TRẢ VỀ
// Ý CHÍNH 4 (DRY): TÁCH LOGIC THÀNH HÀM RÕ MỤC ĐÍCH, GIẢM TRÙNG LẶP CODE
// --------------------------------------------------------------------------
/**
 * Hàm 1: Đóng gói logic tạo chuỗi HTML cho 1 phần tử dịch vụ
 * @param {Object} item - Tham số: Đối tượng dịch vụ đơn lẻ
 * @returns {string} - Giá trị trả về: Chuỗi HTML của 1 card dịch vụ
 */
function createCardHTML(item) {
  // Trả về chuỗi HTML bằng Template Literal, điền dữ liệu động từ tham số item
  return `
    <div class="service" data-id="${item.id}">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    </div>
  `; // Giá trị trả về (return value)
}


/**
 * Hàm 2: Tự động hóa việc tạo danh sách bằng vòng lặp và xử lý dữ liệu
 * @param {Array} list - Tham số: Mảng danh sách các dịch vụ cần xử lý
 * @returns {string} - Giá trị trả về: Toàn bộ chuỗi HTML của danh sách sau khi lặp
 */
function generateServiceListHTML(list) {
  // ------------------------------------------------------------------------
  // Ý CHÍNH 3 (SCOPE): BIẾN CỤC BỘ (LOCAL / FUNCTION SCOPE)
  // Biến htmlResult chỉ tồn tại và sử dụng được bên trong hàm generateServiceListHTML
  // ------------------------------------------------------------------------
  let htmlResult = ""; // Biến cục bộ tích lũy chuỗi kết quả qua các vòng lặp

  // Kiểm tra điều kiện: Nếu dữ liệu truyền vào rỗng hoặc không phải mảng
  if (!Array.isArray(list) || list.length === 0) {
    return "<p>Danh sách trống, không có dịch vụ nào để hiển thị.</p>"; // Giá trị trả về khi rỗng
  }

  // ------------------------------------------------------------------------
  // Ý CHÍNH 1 (VÒNG LẶP): DÙNG FOR ĐỂ LẶP THEO SỐ LẦN (list.length LẦN)
  // Tự động hóa việc lặp dữ liệu thay vì phải viết tay thủ công từng phần tử
  // ------------------------------------------------------------------------
  for (let i = 0; i < list.length; i++) {
    const currentItem = list[i]; // Biến cục bộ trong từng vòng lặp (Block Scope)
    htmlResult += createCardHTML(currentItem); // Gọi hàm con và cộng dồn chuỗi (Nguyên tắc DRY)
  }

  // Trả về toàn bộ chuỗi HTML đã được tổng hợp qua vòng lặp
  return htmlResult; // Giá trị trả về của hàm (Return value)
}


// --------------------------------------------------------------------------
// XUẤT KẾT QUẢ RA GIAO DIỆN & CONSOLE (KẾT QUẢ ĐẠT ĐƯỢC CỦA BÀI HỌC)
// --------------------------------------------------------------------------
// 1. Kiểm tra kết quả logic trên Console (thuần Javascript Core)
console.log("=== KẾT QUẢ TẠO DANH SÁCH BẰNG VÒNG LẶP & HÀM (BÀI 09) ===");
console.log(generateServiceListHTML(serviceData));

// 2. Xuất kết quả chuỗi đã tạo ra vùng chứa trên trang web
const servicesContainer = document.getElementById("services-container");
if (servicesContainer) {
  servicesContainer.innerHTML = generateServiceListHTML(serviceData); // Gọi hàm và hiển thị kết quả
}
```

---

## 4. Hướng dẫn kiểm thử (Testing)

1. **Kiểm tra kết quả thuần logic trên Console (F12):**
   - Mở file `index.html` -> bấm `F12` -> mở tab **Console**.
   - Dòng log `=== KẾT QUẢ TẠO DANH SÁCH BẰNG VÒNG LẶP & HÀM (BÀI 09) ===` sẽ in ra toàn bộ chuỗi HTML được ghép nối hoàn toàn bằng vòng lặp và giá trị trả về của hàm `generateServiceListHTML()`.

2. **Kiểm tra tính tái sử dụng của hàm với dữ liệu mới:**
   - Trong tab Console, gọi hàm với mảng dữ liệu thử nghiệm:
     ```javascript
     const mockList = [
       { id: 99, title: "Lập trình React", description: "Xây dựng ứng dụng SPA chuyên nghiệp." }
     ];

     // Hàm tự động lặp và trả về chuỗi HTML tương ứng
     console.log(generateServiceListHTML(mockList));
     ```
   - Kết quả trả về một chuỗi HTML mới mà không cần can thiệp bất kỳ dòng code DOM nào.
