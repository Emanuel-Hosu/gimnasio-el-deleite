// Gimnasio El Deleite · animaciones
// Mismo motor que la web de Juanjo Villajos: GSAP + ScrollTrigger,
// con degradado completo a estático bajo prefers-reduced-motion.

(function () {
  "use strict";

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined";

  // ---- Nav: sólida al salir del hero + oculta al bajar, visible al subir ----
  function initNav() {
    var nav = document.getElementById("nav");
    var sentinel = document.getElementById("top-sentinel");
    if (!nav) return;

    if (sentinel && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        nav.classList.toggle("nav--solid", !entries[0].isIntersecting);
      }).observe(sentinel);
    }

    var lastY = window.scrollY;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = window.scrollY;
        if (y > 400 && y > lastY + 6) {
          nav.classList.add("nav--hidden");
        } else if (y < lastY - 6) {
          nav.classList.remove("nav--hidden");
        }
        lastY = y;
        ticking = false;
      });
    }, { passive: true });

  }

  // ---- Panel de menú a pantalla completa ----
  function initMenu() {
    var toggle = document.getElementById("navToggle");
    var panel = document.getElementById("menu");
    var close = document.getElementById("menuClose");
    if (!toggle || !panel) return;

    var lastFocus = null;

    function open() {
      lastFocus = document.activeElement;
      panel.classList.add("is-open");
      panel.setAttribute("aria-hidden", "false");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = panel.querySelector(".menu__link");
      if (first) first.focus({ preventScroll: true });
    }

    function shut() {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }

    toggle.addEventListener("click", open);
    if (close) close.addEventListener("click", shut);

    // Los enlaces internos de la misma página cierran el panel en vez de recargar
    panel.querySelectorAll(".menu__link").forEach(function (a) {
      a.addEventListener("click", function () {
        if (a.getAttribute("href").indexOf("#") !== -1) shut();
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && panel.classList.contains("is-open")) shut();
    });
  }

  // ---- Botones magnéticos ----
  function initMagnetic() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    document.querySelectorAll(".magnetic").forEach(function (el) {
      var xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });
      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.25);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.25);
      });
      el.addEventListener("mouseleave", function () {
        xTo(0); yTo(0);
      });
    });
  }

  // ---- Revelados con scroll ----
  function initReveals() {
    // Titular del hero: las líneas suben al cargar
    var lines = document.querySelectorAll(".hero__title .line__inner");
    if (lines.length) {
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, {
        yPercent: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        delay: 0.2
      });
    }

    // Cabeceras y párrafos
    gsap.utils.toArray(".anim-head, .anim-up").forEach(function (el) {
      gsap.from(el, {
        y: 36,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    // Imágenes: revelado con clip-path
    gsap.utils.toArray(".anim-reveal").forEach(function (el) {
      gsap.from(el, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "power4.inOut",
        scrollTrigger: { trigger: el, start: "top 82%", once: true }
      });
    });

    // Parallax suave en imágenes marcadas
    gsap.utils.toArray(".parallax").forEach(function (img) {
      gsap.fromTo(img,
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("section") || img,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
    });
  }

  // ---- Lightbox de la galería ----
  function initLightbox() {
    var box = document.getElementById("lightbox");
    var img = document.getElementById("lightboxImg");
    var close = document.getElementById("lightboxClose");
    if (!box || !img) return;

    function open(src, alt) {
      img.src = src;
      img.alt = alt || "";
      box.classList.add("is-open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function shut() {
      box.classList.remove("is-open");
      box.setAttribute("aria-hidden", "true");
      img.removeAttribute("src");
      document.body.style.overflow = "";
    }

    document.querySelectorAll(".wall__item").forEach(function (item) {
      var photo = item.querySelector("img");
      if (!photo) return;
      item.addEventListener("click", function () { open(photo.src, photo.alt); });
      item.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open(photo.src, photo.alt);
        }
      });
    });

    if (close) close.addEventListener("click", shut);
    box.addEventListener("click", function (e) {
      if (e.target === box) shut();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && box.classList.contains("is-open")) shut();
    });
  }

  // ---- Arranque ----
  initNav();
  initMenu();
  initLightbox();

  if (reduced || !hasGSAP) {
    // Modo estático: todo visible, sin animaciones
    document.documentElement.classList.add("no-anim");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  initMagnetic();
  initReveals();
})();
