const modules = [
  "./content-animation.js",
  "./global-parallax.js",
  "./grow-card.js",
  "./heading-animation.js",
  "./hero-main-scroll.js",
  "./home-hero-hover.js",
  "./intro-animation.js",
  "./nav-menu.js",
  "./page-transition.js",
  "./slider.js",
  "./sticky-cta-hide.js",
  "./title-marquee.js",
  "./video-fallback.js",
];

function loadModules() {
  modules.forEach((path) => {
    import(path).catch((error) => {
      console.error(`[Jagerhof] Failed to load ${path}`, error);
    });
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", loadModules, { once: true });
} else {
  loadModules();
}
