const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const toggleTriggers = document.querySelectorAll('[data-menu=trigger]');

toggleTriggers.forEach(trigger => {
  const targetSelector = trigger.getAttribute('data-target') || '[data-menu=target]';
  const target = document.querySelector(targetSelector);
  if (!target) return;

  const items = target.querySelectorAll('[data-menu=item]');
  const background = target.querySelector('[data-menu=background]');
  const overlay = target.querySelector('[data-menu=overlay]');
  const nav = document.querySelector('[data-menu=nav]');
  let isOpen = false;

  // Set initial states
  gsap.set(target, { display: 'none' });

  // Build OPEN timeline
  const openTl = gsap.timeline({ paused: true });

  if (prefersReducedMotion) {
    openTl.set(target, { display: 'block' });

    openTl.from(overlay, {
      opacity: 0,
      duration: 0.3
    });
    openTl.from(background, {
      opacity: 0,
      duration: 0.75
    }, "<+50%");

  } else {
    openTl.set(target, { display: 'block' });

    if (overlay) {
      openTl.from(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "none"
      });
    }
    if (background) {
      openTl.from(background, {
        scaleY: 0,
        duration: 0.75,
        ease: "expo.out"
      }, "<");
    }
    if (items) {
      openTl.fromTo(items, {
        opacity: 0,
        y: 20
      }, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.6,
        ease: "expo.out"
      }, "<+20%");
    }
  }

  // Build CLOSE timeline
  const closeTl = gsap.timeline({
    paused: true,
    onComplete: () => {
      gsap.set(target, { display: 'none' });
      if (nav) {
        nav.classList.remove('is-active');
      }
    }
  });

  if (prefersReducedMotion) {
    closeTl.from(overlay, {
      opacity: 0,
      duration: 0.3
    });
    closeTl.from(background, {
      opacity: 0,
      duration: 0.3
    }, "<");

  } else {
    if (items) {
      closeTl.to(items, {
        opacity: 0,
        duration: 0,
        ease: "none"
      });
    }
    if (background) {
      closeTl.to(background, {
        scaleY: 0,
        duration: 0.4,
        ease: "expo.in"
      });
    }
    if (overlay) {
      closeTl.to(overlay, {
        opacity: 0,
        duration: 0.3,
        ease: "none"
      }, 0.2);
    }
  }

  const closeMenu = () => {
    closeTl.restart();
    lenis.start();
    isOpen = false;
    trigger.setAttribute('aria-expanded', 'false');
    trigger.classList.remove('is-active');
  };

  // Trigger click handler
  trigger.addEventListener('click', () => {
    if (isOpen) {
      closeMenu();
    } else {
      openTl.restart();
      lenis.stop();
      isOpen = true;
      trigger.setAttribute('aria-expanded', 'true');
      trigger.classList.add('is-active');
      if (nav) {
        nav.classList.add('is-active');
      }
    }
  });

  // Escape key handler
  const handleEscape = (e) => {
    if (e.key === 'Escape' && isOpen) {
      closeMenu();
    }
  };
  document.addEventListener('keydown', handleEscape);

  // Overlay click handler
  if (overlay) {
    overlay.addEventListener('click', () => {
      if (isOpen) {
        closeMenu();
      }
    });
  }
});
