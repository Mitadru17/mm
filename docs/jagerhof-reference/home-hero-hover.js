gsap.matchMedia().add("(hover: hover) and (pointer: fine)", () => {
  const links = document.querySelectorAll('[data-hero-hover]');
  const backgrounds = document.querySelectorAll('[data-hero-bg]');
  const nav = document.querySelector('[data-hero-links]');

  // Set all backgrounds to hidden initially
  gsap.set(backgrounds, { autoAlpha: 0 });

  links.forEach(link => {
    const targetBg = link.dataset.heroHover;
    const bgElement = document.querySelector(`[data-hero-bg="${targetBg}"]`);

    link.addEventListener('mouseenter', () => {
      // Kill all ongoing animations on backgrounds to prevent conflicts
      gsap.killTweensOf(backgrounds);

      // Fade out all other backgrounds
      backgrounds.forEach(bg => {
        if (bg !== bgElement) {
          gsap.to(bg, { autoAlpha: 0, duration: 0.4 });
        }
      });

      // Fade in the target background
      gsap.to(bgElement, {
        autoAlpha: 1,
        duration: 0.8,
        ease: 'power2.out'
      });
    });

    link.addEventListener('mouseleave', () => {
      // Kill ongoing animations before fading out
      gsap.killTweensOf(bgElement);
      gsap.to(bgElement, {
        autoAlpha: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
    });
  });

  // Ensure all backgrounds fade out when leaving the nav area
  nav.addEventListener('mouseleave', () => {
    // Kill all ongoing animations first
    gsap.killTweensOf(backgrounds);
    gsap.to(backgrounds, {
      autoAlpha: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });
});
