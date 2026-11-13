const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion) {
  const scrollTriggers = document.querySelectorAll('[data-hero-main-wrap]');
  scrollTriggers.forEach(wrap => {
    const visualWrap = wrap.querySelector('[data-hero-main-visual-wrap]');
    const visual = wrap.querySelector('[data-hero-main-visual]');

    // First tween for visualWrap with shorter end trigger
    gsap.from(visualWrap, {
      scale: 0.85,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom center",
        scrub: true
      }
    });

    // Second tween for visual with full end trigger
    gsap.from(visual, {
      scale: 1.25,
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });
  });
}
