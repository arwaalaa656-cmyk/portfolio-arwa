// ============================================================
// ARWA ALAA - PORTFOLIO JAVASCRIPT
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  initTypeWriter();
  initThemeToggle();
  initProjectFilters();
  initMobileNav();
  initScrollSpy();
});

// Typing Animation
const words = [
  "Web Applications.",
  "Clean Software Architecture.",
  "Modern Full-Stack Systems.",
  "Intuitive User Interfaces.",
  "Algorithmic Solutions."
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingDelay = 110;
const erasingDelay = 60;
const newWordDelay = 1800;

function initTypeWriter() {
  const typedEl = document.getElementById("typedText");
  if (!typedEl) return;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typedEl.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = newWordDelay;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

// Theme Toggle (Dark / Light)
function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const icon = toggleBtn.querySelector("i");

  // Check saved preference
  const savedTheme = localStorage.getItem("arwa-portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.remove("dark-theme");
    document.body.classList.add("light-theme");
    icon.className = "fa-solid fa-sun";
  }

  toggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark-theme");
    if (isDark) {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      icon.className = "fa-solid fa-sun";
      localStorage.setItem("arwa-portfolio-theme", "light");
    } else {
      document.body.classList.remove("light-theme");
      document.body.classList.add("dark-theme");
      icon.className = "fa-solid fa-moon";
      localStorage.setItem("arwa-portfolio-theme", "dark");
    }
  });
}

// Project Category Filters
function initProjectFilters() {
  const tabs = document.querySelectorAll(".proj-tab");
  const cards = document.querySelectorAll(".project-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === "all" || cat === filter) {
          card.style.display = "flex";
          setTimeout(() => card.style.opacity = "1", 10);
        } else {
          card.style.display = "none";
          card.style.opacity = "0";
        }
      });
    });
  });
}

// Mobile Nav
function initMobileNav() {
  const toggle = document.getElementById("mobileToggle");
  const menu = document.getElementById("navMenu");

  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("active"));
  });
}

// Contact Form Handler
function handleContactSubmit(e) {
  e.preventDefault();
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  // Visual success state
  form.style.display = "none";
  feedback.style.display = "flex";

  // Re-enable after 6 seconds if needed
  setTimeout(() => {
    form.reset();
    form.style.display = "block";
    feedback.style.display = "none";
  }, 6000);
}

// Simulate CV Download
function simulateCVDownload(e) {
  e.preventDefault();
  alert("📄 Downloading Arwa Alaa - Software Engineer CV (PDF)...");
}

// Add Project Guide Modal
function showAddProjectGuide() {
  document.getElementById("guideModal").classList.add("active");
}

function closeGuideModal() {
  document.getElementById("guideModal").classList.remove("active");
}

document.getElementById("guideModal").addEventListener("click", (e) => {
  if (e.target.id === "guideModal") closeGuideModal();
});

// Active Nav Link Scroll Spy & Dynamic Underline Movement
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateActive() {
    const scrollPosition = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute("id");

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });

    // If reached bottom of page, highlight Contact
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 60) {
      navLinks.forEach(l => l.classList.remove("active"));
      const contactLink = document.querySelector('.nav-link[href="#contact"]');
      if (contactLink) contactLink.classList.add("active");
    }
  }

  // Click handler on nav links for instant active transition
  navLinks.forEach(link => {
    link.addEventListener("click", function() {
      navLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
    });
  });

  window.addEventListener("scroll", updateActive, { passive: true });
  updateActive();
}
