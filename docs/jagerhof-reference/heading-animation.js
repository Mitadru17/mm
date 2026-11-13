function initSplitTextAnimations(selector = '[data-split-heading=true]') {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    return;
  }

  const elements = document.querySelectorAll(selector);

  elements.forEach((element) => {
    const isRichText = element.children.length > 0 &&
      element.children[0].tagName !== undefined;

    const targets = isRichText ?
      Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6, p')) : [element];

    targets.forEach((target) => {
      SplitText.create(target, {
        type: 'words, chars',

        onSplit(self) {
          gsap.set(self.chars, {
            willChange: 'transform',
            transformOrigin: '50% 100%',
            scaleY: 0,
            opacity: 0
          });

          // Create the animation
          const animation = gsap.to(self.chars, {
            duration: 0.5,
            ease: 'power2.out',
            opacity: 1,
            scaleY: 1,
            stagger: 0.02,
            scrollTrigger: {
              trigger: element,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          });

          return animation;
        }
      });
    });
  });
}

initSplitTextAnimations();
