// 1. Logic Menu Hamburger cho Mobile
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    const icon = menuBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Đóng menu khi click vào link (Mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        const icon = menuBtn.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// 2. Hiệu ứng Navbar thay đổi nền khi cuộn
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 3. Scroll Reveal (Hiển thị phần tử mượt mà khi cuộn tới)
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach(el => {
        let windowHeight = window.innerHeight;
        let elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - 80) { // Điều chỉnh để hiện sớm/muộn hơn
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", reveal);
window.addEventListener("load", reveal);

// 4. Smooth scroll với offset cho Fixed Header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // Bù trừ chiều cao của navbar
                behavior: 'smooth'
            });
        }
    });
});

// 5. ScrollSpy (Tự động Active Menu khi cuộn tới section)
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 6. Hiệu ứng Typing cho Subtitle (Mới)
const text = "Sinh viên Công nghệ thông tin chuyên tâm xây dựng các sản phẩm web hiện đại, mượt mà và tối ưu UI/UX.";
const typingElement = document.getElementById("typing-text");
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingElement.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 40); // Tốc độ gõ 40ms
    }
}
// Chạy hiệu ứng gõ chữ sau khi trang load 0.5s
window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

// 7. Xử lý Form Liên hệ (Formspree + Toast)
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 5000);
}

toastClose && toastClose.addEventListener('click', () => toast.classList.remove('show'));

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.contact-form__submit');
    const originalText = btn.textContent;
    
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Đang gửi...'; // Thêm icon loading
    btn.disabled = true;

    const data = new FormData(contactForm);

    try {
      const res = await fetch('https://formspree.io/f/meepyaeq', {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        showToast();
        contactForm.reset();
        formNote.textContent = ''; // Xóa lỗi nếu có
      } else {
        throw new Error();
      }
    } catch {
      formNote.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Có lỗi xảy ra. Vui lòng email trực tiếp: phucthien3156@gmail.com';
      formNote.style.color = '#eb5757';
    }

    btn.textContent = originalText;
    btn.disabled = false;
  });
}

// 8. Dark/Light Mode Logic
const themeToggle = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// Kiểm tra nếu trước đó người dùng đã chọn theme nào chưa
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'light') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

themeToggle.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
});