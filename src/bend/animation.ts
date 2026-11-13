import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.ticker.lagSmoothing(0);
ScrollTrigger.config({ ignoreMobileResize: true });

// Measured from the reference's rendered choreography, November 12, 2026.
export const referenceMotion = {
  scroll: 1.15,
  scrollEase: (progress: number) => 1 - Math.pow(1 - progress, 3),
  heroWord: 1,
  heroStagger: 0.06,
  slideInterval: 6000,
  slideFade: 1.4,
  storyWipe: 0.75,
  storyExit: 0.4,
  storyStagger: 0.1,
  scrub: 0.8,
  reveal: 1.1,
  pillarOffsets: [140, 70, 0],
} as const;

export { gsap, ScrollTrigger };
