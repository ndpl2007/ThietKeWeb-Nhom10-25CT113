// ============================================================
// BUỔI 8 - JAVASCRIPT CƠ BẢN
// ============================================================

// 1. THÔNG BÁO CHÀO MỪNG THEO THỜI GIAN THỰC
// ------------------------------------------------------------
// Lấy giờ hiện tại từ hệ thống bằng new Date().getHours() (từ 0 đến 23)
const currentHour = new Date().getHours();
let greeting = "";

// Phân loại lời chào theo từng khung giờ trong ngày:
// - Buổi sáng: từ 05:00 đến trước 12:00
// - Buổi chiều: từ 12:00 đến trước 18:00
// - Buổi tối / đêm: các giờ còn lại (18:00 - 04:59)
if (currentHour >= 5 && currentHour < 12) {
  greeting = "Chào buổi sáng!";
} else if (currentHour >= 12 && currentHour < 18) {
  greeting = "Chào buổi chiều!";
} else {
  greeting = "Chào buổi tối!";
}

// Hiển thị hộp thoại thông báo chào mừng người dùng
alert(greeting);


// 2. HIỆU ỨNG ẨN/HIỆN NÚT LIÊN HỆ NỔI (FLOATING CONTACT)
// ------------------------------------------------------------
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

