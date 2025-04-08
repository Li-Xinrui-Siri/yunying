// 返回顶部按钮
const backToTop = document.getElementById("backToTop");
window.onscroll = () => {
  backToTop.style.display = window.scrollY > 300 ? "block" : "none";
};
backToTop.onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const sideNav = document.getElementById("sideNav");
const navLinks = document.querySelectorAll(".side-nav a");

// 页面滚动时显示/隐藏导航
window.addEventListener("scroll", () => {
  sideNav.style.display = window.scrollY > 300 ? "flex" : "none";
  highlightCurrentSection();
});

// 获取所有 section 元素
const sections = document.querySelectorAll(".section");

function highlightCurrentSection() {
  let currentId = "";

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 150) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === `#${currentId}`) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
