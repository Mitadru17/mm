// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!prefersReducedMotion) {

  // DESKTOP: Hover interaction
  gsap.matchMedia().add("(hover: hover) and (pointer: fine)", () => {
    const links = document.querySelectorAll('[data-intro-hover]');
    const images = document.querySelectorAll('[data-intro-img]');
    const container = document.querySelector('[data-intro-text]');

    gsap.set(images, { autoAlpha: 0, scale: 0.8 });

    links.forEach(link => {
      const targetImg = link.dataset.introHover;
      const imgElement = document.querySelector(`[data-intro-img="${targetImg}"]`);
      const innerImage = imgElement.querySelector('img');

      link.addEventListener('mouseenter', () => {
        gsap.killTweensOf([imgElement, innerImage]);
        gsap.set(link, { zIndex: 2 });
        gsap.to(imgElement, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out'
        });
      });

      link.addEventListener('mousemove', (e) => {
        const linkRect = link.getBoundingClientRect();
        const linkCenterX = linkRect.left + linkRect.width / 2;
        const mouseX = e.clientX;
        const offsetX = (mouseX - linkCenterX) * 0.075;

        gsap.to(innerImage, {
          x: offsetX,
          duration: 1,
          ease: 'power2.out',
          overwrite: 'auto'
        });
      });

      link.addEventListener('mouseleave', () => {
        gsap.killTweensOf([imgElement, innerImage]);
        gsap.set(link, { zIndex: 'auto' });
        gsap.to(imgElement, {
          autoAlpha: 0,
          scale: 0.8,
          duration: 0.4,
          ease: 'power2.out'
        });
        gsap.to(innerImage, {
          x: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    container.addEventListener('mouseleave', () => {
      const innerImages = Array.from(images).map(img => img.querySelector('img'));
      gsap.killTweensOf([...images, ...innerImages]);
      gsap.to(images, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.to(innerImages, {
        x: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
      gsap.set(links, { zIndex: 'auto' });
    });
  });

  // TOUCH DEVICES: Scroll-triggered reveal
  gsap.matchMedia().add("(hover: none)", () => {
    const images = document.querySelectorAll('[data-intro-img]');
    const container = document.querySelector('[data-intro-wrap]');

    gsap.set(images, { autoAlpha: 0, scale: 0.9, y: 30, zIndex: 0 });

    gsap.to(images, {
      autoAlpha: 1,
      scale: 1,
      y: 0,
      duration: 1.2,
      stagger: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container,
        start: 'top 30%',
        toggleActions: 'play none none none'
      }
    });
  });
}
