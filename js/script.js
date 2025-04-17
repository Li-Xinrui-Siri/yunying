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
  sideNav.style.display = window.scrollY > 200 ? "flex" : "none";
  highlightCurrentSection();
});

// 侧边栏的高亮
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