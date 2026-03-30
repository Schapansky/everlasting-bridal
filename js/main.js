/* ============================================
   Everlasting Bridal — Main JavaScript
   Built by CloudPulseAI
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initStickyHeader();
  initMobileMenu();
  initScrollReveal();
  initHeroSlideshow();
  initTestimonialCarousel();
  initFAQAccordion();
  initSmoothScroll();
  initBackToTop();
});

/* --- Sticky Header --- */
function initStickyHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  let lastScroll = 0;
  window.addEventListener(
    "scroll",
    () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
      lastScroll = currentScroll;
    },
    { passive: true },
  );
}

/* --- Mobile Menu --- */
function initMobileMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    nav.classList.toggle("active");
    document.body.style.overflow = nav.classList.contains("active")
      ? "hidden"
      : "";
  });

  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => {
      if (nav.classList.contains("active")) {
        toggle.classList.remove("active");
        nav.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  });
}

/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .stagger",
  );
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  reveals.forEach((el) => observer.observe(el));
}

/* --- Hero Slideshow --- */
function initHeroSlideshow() {
  const slides = document.querySelectorAll(".hero__slide");
  const dots = document.querySelectorAll(".hero__dot");
  if (slides.length < 2) return;

  let current = 0;
  let interval;

  function goToSlide(index) {
    slides[current].classList.remove("active");
    if (dots[current]) dots[current].classList.remove("active");
    current = index;
    slides[current].classList.add("active");
    if (dots[current]) dots[current].classList.add("active");
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function startAutoplay() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    clearInterval(interval);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      stopAutoplay();
      goToSlide(i);
      startAutoplay();
    });
  });

  startAutoplay();
}

/* --- Testimonial Carousel --- */
function initTestimonialCarousel() {
  const track = document.querySelector(".testimonial-track");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  if (!track) return;

  const cards = track.querySelectorAll(".testimonial-card");
  let current = 0;
  let autoInterval;

  function goTo(index) {
    current = ((index % cards.length) + cards.length) % cards.length;
    track.style.transform = "translateX(-" + current * 100 + "%)";
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      stopAuto();
      goTo(current - 1);
      startAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      stopAuto();
      goTo(current + 1);
      startAuto();
    });
  }

  function startAuto() {
    autoInterval = setInterval(() => goTo(current + 1), 6000);
  }
  function stopAuto() {
    clearInterval(autoInterval);
  }

  startAuto();
}

/* --- FAQ Accordion --- */
function initFAQAccordion() {
  const items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");
    if (!question || !answer) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      items.forEach((i) => {
        i.classList.remove("active");
        const a = i.querySelector(".faq-answer");
        if (a) a.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
}

/* --- Smooth Scroll --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

/* --- Back to Top --- */
function initBackToTop() {
  const btn = document.createElement("button");
  btn.className = "back-to-top";
  btn.textContent = "\u2191";
  btn.setAttribute("aria-label", "Back to top");
  Object.assign(btn.style, {
    position: "fixed",
    bottom: "2rem",
    right: "2rem",
    width: "44px",
    height: "44px",
    background: "#B08D57",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "1.2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: "0",
    visibility: "hidden",
    transition: "all 0.3s ease",
    zIndex: "900",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  });

  document.body.appendChild(btn);

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 600) {
        btn.style.opacity = "1";
        btn.style.visibility = "visible";
      } else {
        btn.style.opacity = "0";
        btn.style.visibility = "hidden";
      }
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
