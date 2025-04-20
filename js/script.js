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
  if (window.innerWidth > 1024) {
    sideNav.style.display = window.scrollY > 200 ? "flex" : "none";
    highlightCurrentSection();
  }
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

//移动端的顶端目录
const topNav = document.getElementById("topNav");

window.addEventListener("scroll", () => {
  if (window.innerWidth < 1024) {
    topNav.style.display = window.scrollY > 200 ? "flex" : "none";
    highlightCurrentSection();
  }
});


const items = document.querySelectorAll(".carousel-item");
const dotsContainer = document.querySelector(".dots-container");

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

