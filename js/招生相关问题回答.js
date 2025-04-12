// 返回顶部按钮
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
};
backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 移动端导航功能
function toggleNav() {
  const nav = document.getElementById("sideNav");
  nav.classList.toggle("open");

  // 点击导航链接后关闭菜单
  document.querySelectorAll('.side-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        nav.classList.remove('open');
      }
    });
  });
}

// 高亮当前章节
const sections = document.querySelectorAll(".section");
const navLinks = document.querySelectorAll(".side-nav a");

function highlightCurrentSection() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 100 && rect.bottom >= 100) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
}

window.addEventListener("scroll", highlightCurrentSection);

// 触摸设备优化
document.addEventListener('touchstart', function () { }, { passive: true });

// 阻止iOS橡皮筋效果
document.body.addEventListener('touchmove', function (e) {
  if (document.querySelector('.side-nav.open')) {
    e.preventDefault();
  }
}, { passive: false });

// 点击外部关闭导航
document.addEventListener('click', function (e) {
  const nav = document.getElementById("sideNav");
  const toggleBtn = document.querySelector('.nav-toggle');

  if (window.innerWidth <= 768 &&
    !nav.contains(e.target) &&
    e.target !== toggleBtn &&
    !toggleBtn.contains(e.target)) {
    nav.classList.remove('open');
  }
});

// 添加到script.js文件
// 防止横向滚动
document.addEventListener('DOMContentLoaded', function () {
  let touchStartX = 0;

  document.body.addEventListener('touchstart', function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  document.body.addEventListener('touchmove', function (e) {
    const touchX = e.touches[0].clientX;
    const diffX = touchX - touchStartX;

    // 如果横向滑动距离大于纵向滑动距离，则阻止默认行为
    if (Math.abs(diffX) > 10) {
      e.preventDefault();
    }
  }, { passive: false });
});