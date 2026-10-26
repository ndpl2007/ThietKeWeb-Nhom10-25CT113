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
