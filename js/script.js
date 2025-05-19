// 自动为所有 <a> 标签添加 target="_blank"
document.querySelectorAll('a').forEach(link => {
  link.setAttribute('target', '_blank');
});
document.querySelectorAll('li a').forEach(link => {
  link.setAttribute('target', '_self');
});
document.querySelectorAll('nav a').forEach(link => {
  link.setAttribute('target', '_self');
});

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

// 平滑滚动并修正顶部偏移
navLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault(); // 阻止默认跳转
    const targetId = this.getAttribute("href").substring(1); // 去掉#
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80; // 根据实际 header 高度设置
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

const topNavLinks = document.querySelectorAll("#topNav a");

topNavLinks.forEach(link => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  });
});

