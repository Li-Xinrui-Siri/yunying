// 返回顶部按钮
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
};
backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// 侧边导航功能
const sideNav = document.getElementById("sideNav");
const navLinks = document.querySelectorAll(".side-nav a");
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
  sideNav.style.display = window.scrollY > 300 ? "flex" : "none";
  highlightCurrentSection();
});

function highlightCurrentSection() {
  let currentId = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentId = section.id;
    }
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
  });
};

// 轮播图功能
const carouselInner = document.querySelector(".carousel-inner");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const items = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
let autoSlideInterval;

function updateCarousel() {
  const offset = -currentIndex * 700;
  carouselInner.style.transform = `translateX(${offset}px)`;

  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentIndex);
  });
}

// 初始化小圆点
items.forEach((_, index) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

// 手动切换
prevBtn.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  updateCarousel();
  resetAutoSlide();
});

nextBtn.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
  resetAutoSlide();
});

// 自动播放功能
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % items.length;
    updateCarousel();
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

startAutoSlide();

// 移动端侧边栏功能
const navToggle = document.getElementById("navToggle");
const overlay = document.createElement("div");
overlay.className = "overlay";
document.body.appendChild(overlay);

// 创建关闭按钮
const closeBtn = document.createElement("button");
closeBtn.className = "close-btn";
closeBtn.innerHTML = "×";
closeBtn.setAttribute("aria-label", "关闭菜单");
sideNav.prepend(closeBtn);

// 切换侧边栏
function toggleSideNav() {
  sideNav.classList.toggle("open");
  overlay.style.display = sideNav.classList.contains("open") ? "block" : "none";
  document.body.style.overflow = sideNav.classList.contains("open") ? "hidden" : "";
}

// 只在移动端添加事件监听
if (window.innerWidth <= 768) {
  navToggle.addEventListener("click", toggleSideNav);
  closeBtn.addEventListener("click", toggleSideNav);
  overlay.addEventListener("click", toggleSideNav);
}

// 点击导航链接处理
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      toggleSideNav();
    }
  });
});

// 滚动和窗口大小变化处理
window.addEventListener('scroll', highlightCurrentSection);
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sideNav.style.right = '20px';
    overlay.style.display = 'none';
  }
});