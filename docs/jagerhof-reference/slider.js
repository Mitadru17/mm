let rafs = [];
let sliderInstances = new Map();
let scrollSliders = []; // Track sliders that respond to page scroll

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Scroll speed multiplier - adjust this value to control how fast sliders move
const SCROLL_SPEED = 0.0001; // Very subtle movement

// Helper function to handle links in sliders
function handleLinks(wrapper) {
  [...wrapper.querySelectorAll('a')].forEach((item) => {
    let startX = 0;
    let startY = 0;
    let startTime = 0;
    let isDragging = false;
    item.style.pointerEvents = 'none';

    const handleMouseDown = (e) => {
      startX = e.clientX;
      startY = e.clientY;
      startTime = Date.now();
      isDragging = false;
    };

    const handleMouseMove = (e) => {
      if (!startTime) return;
      const deltaX = Math.abs(e.clientX - startX);
      const deltaY = Math.abs(e.clientY - startY);
      if (deltaX > 5 || deltaY > 5) {
        isDragging = true;
      }
    };

    const handleMouseUp = (e) => {
      const deltaTime = Date.now() - startTime;
      if (!isDragging && deltaTime < 200) {
        item.click();
      }
      startTime = 0;
      isDragging = false;
    };

    item.parentElement.addEventListener('mousedown', handleMouseDown);
    item.parentElement.addEventListener('mousemove', handleMouseMove);
    item.parentElement.addEventListener('mouseup', handleMouseUp);
  });
}

function initializeSlider1(sliderWrapper) {
  const slides = Array.from(sliderWrapper.children).filter(
    child => child.style.display !== 'none'
  );

  const slider = new Smooothy(sliderWrapper, {
    onSlideChange: (currentSlide, previousSlide) => {
      if (previousSlide !== null) {
        const prevSlideElement = slides[previousSlide];
        if (prevSlideElement) {
          prevSlideElement.classList.remove('active');
          prevSlideElement.classList.add('animate-out');
        }
      }
      const currentSlideElement = slides[currentSlide];
      if (currentSlideElement) {
        currentSlideElement.classList.remove('animate-out');
        currentSlideElement.classList.add('active');
      }
    },
  });

  if (slides[0]) {
    slides[0].classList.add('active');
  }

  handleLinks(sliderWrapper);

  return slider;
}

function initializeSlider2(sliderWrapper) {
  const contentBlock = document.querySelector('[data-fade-content]');
  const slider = new Smooothy(sliderWrapper, {
    infinite: false,
    snap: true,
    dragSensitivity: 0.005,
    lerpFactor: 0.3,
    scrollSensitivity: 1,
    snapStrength: 0.5,
    onSlideChange: (currentSlide) => {
      const isDesktop = window.innerWidth > 991;
      if (contentBlock && isDesktop) {
        if (currentSlide === 0) {
          contentBlock.classList.remove('fade-out');
        } else {
          contentBlock.classList.add('fade-out');
        }
      }
    },
  });

  handleLinks(sliderWrapper);

  return slider;
}

function initializeSlider3(galleryWrapper) {
  // Get all collection items
  const collectionItems = Array.from(galleryWrapper.children).filter(
    child => child.style.display !== 'none'
  );

  // Split items into rows of 8
  const rowsData = [];
  for (let i = 0; i < collectionItems.length; i += 8) {
    rowsData.push(collectionItems.slice(i, i + 8));
  }

  // Clear the original wrapper
  galleryWrapper.innerHTML = '';

  // Create row wrappers and initialize sliders
  const rowSliders = [];
  rowsData.forEach((rowItems, index) => {
    // Create row wrapper
    const rowWrapper = document.createElement('div');
    rowWrapper.setAttribute('data-gallery-row', index);
    rowWrapper.style.display = 'flex';
    rowWrapper.style.width = '100%';
    rowWrapper.style.overflow = 'hidden';

    // Append items to row
    rowItems.forEach(item => rowWrapper.appendChild(item));

    // Append row to gallery
    galleryWrapper.appendChild(rowWrapper);

    // Initialize Smooothy for this row
    const slider = new Smooothy(rowWrapper, {
      infinite: true,
      snap: false,
      dragSensitivity: 0.005,
      lerpFactor: 0.3,
      scrollSensitivity: 1,
    });

    handleLinks(rowWrapper);

    // Store slider with metadata
    rowSliders.push({
      slider: slider,
      wrapper: rowWrapper,
      direction: index % 2 === 0 ? 1 : -1, // Alternating direction
      rowIndex: index,
      isDragging: false
    });

    sliderInstances.set(rowWrapper, slider);
    rafs.push(() => slider.update());
  });

  // Add to scroll sliders array if motion is allowed
  if (!prefersReducedMotion && rowSliders.length > 0) {
    scrollSliders.push(...rowSliders);

    // Track when user is dragging to pause scroll updates
    rowSliders.forEach(sliderData => {
      const wrapper = sliderData.wrapper;

      wrapper.addEventListener('mousedown', () => {
        sliderData.isDragging = true;
      });

      wrapper.addEventListener('mouseup', () => {
        sliderData.isDragging = false;
      });

      wrapper.addEventListener('touchstart', () => {
        sliderData.isDragging = true;
      }, { passive: true });

      wrapper.addEventListener('touchend', () => {
        sliderData.isDragging = false;
      }, { passive: true });
    });
  }

  return rowSliders;
}

function destroySliders() {
  sliderInstances.forEach((slider, wrapper) => {
    // Remove from rafs array
    const index = rafs.findIndex(raf => {
      // Check if this raf belongs to this slider
      return raf.toString().includes('slider.update');
    });
    if (index > -1) {
      rafs.splice(index, 1);
    }

    // Destroy slider if method exists
    if (slider.destroy) {
      slider.destroy();
    }

    // Clear active classes
    const slides = wrapper.querySelectorAll('.active, .animate-out');
    slides.forEach(slide => {
      slide.classList.remove('active', 'animate-out');
    });
  });

  sliderInstances.clear();
  scrollSliders = [];
}

function initializeAllSliders() {
  // Initialize type 1 sliders
  const sliderWrappers1 = document.querySelectorAll('[data-smooothy="1"]');
  sliderWrappers1.forEach((sliderWrapper) => {
    const slider = initializeSlider1(sliderWrapper);
    sliderInstances.set(sliderWrapper, slider);
    rafs.push(() => slider.update());
  });

  // Initialize type 2 sliders
  const sliderWrappers2 = document.querySelectorAll('[data-smooothy="2"]');
  sliderWrappers2.forEach((sliderWrapper) => {
    const slider = initializeSlider2(sliderWrapper);
    sliderInstances.set(sliderWrapper, slider);
    rafs.push(() => slider.update());
  });

  // Initialize type 3 sliders (gallery)
  const galleryWrappers = document.querySelectorAll('[data-smooothy="3"]');
  galleryWrappers.forEach((galleryWrapper) => {
    initializeSlider3(galleryWrapper);
  });
}

// Track last scroll position globally
let lastScrollY = window.scrollY;

// Handle scroll-based slider movement
function handleScrollSliders() {
  if (prefersReducedMotion || scrollSliders.length === 0) return;

  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  // Only update if there's actual movement
  if (scrollDelta !== 0) {
    scrollSliders.forEach((sliderData) => {
      const { slider, direction, isDragging } = sliderData;

      // Don't update if user is dragging this slider
      if (isDragging) return;

      // Add to the slider's current target position (relative, not absolute)
      slider.target += (scrollDelta * direction * SCROLL_SPEED);
    });

    lastScrollY = currentScrollY;
  }
}

// Use scroll event instead of requestAnimationFrame for updates
let scrollTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(() => {
      handleScrollSliders();
      scrollTicking = false;
    });
    scrollTicking = true;
  }
}, { passive: true });

// Listen for reinitialize event from theme script
document.addEventListener('reinitializeSliders', () => {
  destroySliders();
  initializeAllSliders();
});

// Initial setup
initializeAllSliders();

function animate() {
  rafs.forEach((raf) => raf());
  requestAnimationFrame(animate);
}
animate();
