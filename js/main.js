/* ==========================================================================
   ALPINDA EXPLORE — main.js
   საერთო ფუნქციონალი ყველა გვერდისთვის:
   1) ბურგერ-მენიუ
   2) header-ის ფონის ცვლილება სქროლზე (additional JS logic #1)
   3) scroll-to-top ღილაკი            (additional JS logic #2)
   4) section reveal ანიმაცია          (additional JS logic #3)
   5) cookie-consent ბანერი + localStorage
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- 1) BURGER MENU ---------- */
  const burgerBtn = document.getElementById("burgerBtn");
  const navLinks = document.getElementById("navLinks");

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("is-open");
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("is-open");
        burgerBtn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 2) HEADER BACKGROUND ON SCROLL ----------
     header თავიდან გამჭვირვალეა (გამოსჭვივის hero-ს ფონი),
     40px-ზე მეტი სქროლის შემდეგ ემატება .is-scrolled კლასი,
     რომელიც background+blur-ს რთავს (იხ. style.css). */
  const header = document.querySelector(".site-header");
  function handleHeaderScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 40);
  }
  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* ---------- 3) SCROLL-TO-TOP BUTTON ----------
     ღილაკი ჩნდება მხოლოდ მაშინ, როცა მომხმარებელი 400px-ზე მეტს დასქროლავს. */
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      () => {
        scrollTopBtn.classList.toggle("is-visible", window.scrollY > 400);
      },
      { passive: true },
    );

    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 4) SCROLL-REVEAL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- 5) COOKIE CONSENT BANNER ----------
     localStorage-ში ვინახავთ alpinda_cookie_consent="accepted"-ს.
     თუ ღირებულება უკვე დაყენებულია, ბანერს არასოდეს ვაჩვენებთ ხელახლა —
     "Accept"-ის დაჭერის შემდეგ ის ქრება ყველა შემდეგ ვიზიტზე. */
  const COOKIE_KEY = "alpinda_cookie_consent";
  const cookieBanner = document.getElementById("cookieBanner");
  const cookieAccept = document.getElementById("cookieAccept");

  if (cookieBanner) {
    if (localStorage.getItem(COOKIE_KEY) !== "accepted") {
      // ოდნავი დაყოვნება, რომ ანიმაცია ეფექტურად შეინიშნოს გვერდის ჩატვირთვისას
      setTimeout(() => cookieBanner.classList.add("is-visible"), 600);
    }
    if (cookieAccept) {
      cookieAccept.addEventListener("click", () => {
        localStorage.setItem(COOKIE_KEY, "accepted");
        cookieBanner.classList.remove("is-visible");
      });
    }
  }
});
