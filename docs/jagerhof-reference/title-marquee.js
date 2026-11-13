const scrollTriggers = document.querySelectorAll('[data-marquee-wrap]');
scrollTriggers.forEach(wrap => {
  const top = wrap.querySelector('[data-marquee-top]');
  const bottom = wrap.querySelector('[data-marquee-bottom]');
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrap,
      start: "top bottom",
      end: "top top",
      scrub: 2
    }
  });
  tl.fromTo(top, {
    xPercent: 80
  }, {
    xPercent: -5,
    ease: "none"
  });
  tl.fromTo(bottom, {
    xPercent: -80
  }, {
    xPercent: 5,
    ease: "none"
  }, 0);
});
