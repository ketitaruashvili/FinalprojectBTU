document.addEventListener("DOMContentLoaded", function () {
  var burgerBtn = document.getElementById("burgerBtn");
  var navLinks = document.getElementById("navLinks");

  if (burgerBtn && navLinks) {
    burgerBtn.addEventListener("click", function () {
      var isOpen = navLinks.classList.toggle("is-open");
      burgerBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    var links = navLinks.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", function () {
        navLinks.classList.remove("is-open");
        burgerBtn.setAttribute("aria-expanded", "false");
      });
    }
  }

  var header = document.querySelector(".site-header");

  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }

  handleHeaderScroll();
  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  var scrollTopBtn = document.getElementById("scrollTopBtn");

  if (scrollTopBtn) {
    window.addEventListener(
      "scroll",
      function () {
        if (window.scrollY > 400) {
          scrollTopBtn.classList.add("is-visible");
        } else {
          scrollTopBtn.classList.remove("is-visible");
        }
      },
      { passive: true },
    );

    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealEls.length > 0) {
    var observer = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var entry = entries[i];
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15 },
    );

    for (var j = 0; j < revealEls.length; j++) {
      observer.observe(revealEls[j]);
    }
  } else {
    for (var k = 0; k < revealEls.length; k++) {
      revealEls[k].classList.add("is-visible");
    }
  }

  var COOKIE_KEY = "alpinda_cookie_consent";
  var cookieBanner = document.getElementById("cookieBanner");
  var cookieAccept = document.getElementById("cookieAccept");

  if (cookieBanner) {
    var alreadyAccepted = localStorage.getItem(COOKIE_KEY) === "accepted";

    // თუ მომხმარებელს ჯერ არ დაუჭერია "გასაგებია", ბანერი გამოჩნდეს 0.6 წამში
    if (!alreadyAccepted) {
      setTimeout(function () {
        cookieBanner.classList.add("is-visible");
      }, 600);
    }

    if (cookieAccept) {
      cookieAccept.addEventListener("click", function () {
        localStorage.setItem(COOKIE_KEY, "accepted");
        cookieBanner.classList.remove("is-visible");
      });
    }
  }
});
