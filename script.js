const events = [
  {
    tag: "Набор круглый год",
    title: "Бесплатная пробная тренировка",
    text:
      "Первое знакомство с академией проходит в дружелюбной игровой атмосфере: ребёнок попробует себя на поле, а родители увидят подход тренеров и организацию занятий.",
  },
  {
    tag: "Champion camp",
    title: "Летние и дневные лагеря",
    text:
      "В расписании клуба есть интенсивы и спортивные смены, где дети тренируются, играют, знакомятся и проводят каникулы в активной футбольной среде.",
  },
  {
    tag: "Турниры и матчи",
    title: "Соревновательный опыт с раннего возраста",
    text:
      "С шести лет воспитанники начинают чаще играть против соперников, участвуют во внутренних чемпионатах и выездных соревнованиях по России.",
  },
  {
    tag: "Для родителей",
    title: "Поддержка семьи на всём пути",
    text:
      "Клуб проводит семейные спортивные праздники, открытые тренировки, а также беседы и вебинары о питании, психологии и развитии юных спортсменов.",
  },
];

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");
const navLinks = document.querySelectorAll("[data-nav-link]");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const opened = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(opened));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => body.classList.remove("nav-open"));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 980) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const currentPage = body.dataset.page;
if (currentPage) {
  navLinks.forEach((link) => {
    if (link.dataset.navLink === currentPage) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

const yearNode = document.querySelector("[data-current-year]");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const track = document.querySelector("[data-carousel-track]");
const dotsContainer = document.querySelector("[data-carousel-dots]");
const prevButton = document.querySelector("[data-carousel-prev]");
const nextButton = document.querySelector("[data-carousel-next]");

if (track && dotsContainer) {
  let activeIndex = 0;

  events.forEach((event, index) => {
    const slide = document.createElement("article");
    slide.className = "carousel-slide";
    slide.innerHTML = `
      <div class="carousel-card">
        <span>${event.tag}</span>
        <h3>${event.title}</h3>
        <p>${event.text}</p>
      </div>
    `;
    track.appendChild(slide);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Показать слайд ${index + 1}`);
    dot.addEventListener("click", () => {
      activeIndex = index;
      renderCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  function renderCarousel() {
    track.style.transform = `translateX(-${activeIndex * 100}%)`;
    [...dotsContainer.children].forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
  }

  prevButton?.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + events.length) % events.length;
    renderCarousel();
  });

  nextButton?.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % events.length;
    renderCarousel();
  });

  renderCarousel();
}
