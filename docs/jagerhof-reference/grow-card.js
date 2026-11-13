const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {
  const scrollTriggers = document.querySelectorAll('[data-grow-wrap]');
  scrollTriggers.forEach(wrap => {
    const overlay = wrap.querySelectorAll('[data-grow-overlay]');
    const visual = wrap.querySelectorAll('[data-grow-visual]');
    const content = wrap.querySelectorAll('[data-grow-content]');
    const image = wrap.querySelectorAll('[data-grow-image]');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrap,
        start: "top bottom",
        end: "top top",
        scrub: true
      }
    });

    tl.from(visual, {
      scale: 0.5,
      borderRadius: "2rem",
      duration: 1,
      ease: "none"
    });
    tl.from(overlay, {
      opacity: 0,
      duration: 1,
      ease: "none"
    }, "<");
    tl.from(image, {
      scale: 1.5,
      duration: 1,
      ease: "none"
    }, "<");
    tl.from(content, {
      opacity: 0,
      duration: 0.4,
      ease: "none"
    }, "<+50%");
    tl.from(content, {
      scale: 0.8,
      duration: 0.6,
      ease: "none"
    }, "<");
  });
}

function refreshScrollTrigger() {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

window.addEventListener('load', () => {
  refreshScrollTrigger();
});
