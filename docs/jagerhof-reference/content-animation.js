gsap.registerPlugin(ScrollTrigger);

function initScrollAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll('[data-fade-in=true]');

  elements.forEach(element => {
    if (prefersReducedMotion) {
      gsap.set(element, { opacity: 1 });
      return;
    }

    gsap.set(element, {
      opacity: 0,
      y: 40
    });

    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  });
}

initScrollAnimations();

if (document.fonts) {
  document.fonts.ready.then(() => {
    ScrollTrigger.refresh();
  });
}

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
