const footer = document.querySelector('[data-footer]');
const stickyCTA = document.querySelector('[data-sticky-cta]');

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: footer,
    start: "top bottom",
    toggleActions: "play none none reverse"
  }
});

tl.to(stickyCTA, {
  autoAlpha: 0,
  scale: 0.8,
  duration: 0.5
});
