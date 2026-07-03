window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hide"), 500);
});

const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
});

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => nav.classList.toggle("open"));

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });

revealItems.forEach(item => observer.observe(item));

const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  const heroStats = document.querySelector(".hero-stats");
  if (!heroStats) return;

  const rect = heroStats.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.getAttribute("data-count"));
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 40));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 35);
    });
  }
}

window.addEventListener("scroll", animateCounters);
window.addEventListener("load", animateCounters);
