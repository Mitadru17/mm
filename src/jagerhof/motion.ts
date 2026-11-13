import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../bend/animation";
import { SplitText } from "gsap/SplitText";
import { useSiteMotion } from "../motion";

gsap.registerPlugin(SplitText);

/** Original implementation of the measured Jägerhof choreography. */
export function useJagerhofMotion(route: string) {
  const root = useRef<HTMLDivElement>(null);
  const reduced = useSiteMotion();
  useEffect(() => {
    if (!root.current || reduced) return;
    let disposed = false;
    let context: gsap.Context | undefined;
    const splits: SplitText[] = [];
    void document.fonts.ready.then(() => {
      if (disposed) return;
      context = gsap.context(() => {
        root
          .current!.querySelectorAll<HTMLElement>("[data-jh-reveal]")
          .forEach((el) => {
            gsap.from(el, {
              opacity: 0,
              y: 24,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
          });
        root
          .current!.querySelectorAll<HTMLElement>("[data-jh-heading]")
          .forEach((el) => {
            const split = SplitText.create(el, {
              type: "lines",
              mask: "lines",
              linesClass: "jh-reveal-line",
              autoSplit: true,
              aria: "auto",
              onSplit(self) {
                return gsap.from(self.lines, {
                  opacity: 0,
                  yPercent: 100,
                  duration: 0.85,
                  stagger: 0.085,
                  ease: "power3.out",
                  scrollTrigger: { trigger: el, start: "top 88%", once: true },
                });
              },
            });
            splits.push(split);
          });
        root
          .current!.querySelectorAll<HTMLElement>(".jh-collage")
          .forEach((el) => {
            gsap.fromTo(
              el.querySelector(".jh-collage-back"),
              { yPercent: 9, scale: 1.15 },
              {
                yPercent: -9,
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "clamp(top bottom)",
                  end: "clamp(bottom top)",
                  scrub: true,
                },
              },
            );
            gsap.fromTo(
              el.querySelector(".jh-collage-front"),
              { yPercent: 20 },
              {
                yPercent: -20,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "clamp(top bottom)",
                  end: "clamp(bottom top)",
                  scrub: true,
                },
              },
            );
          });
        const landscape = root.current!.querySelector(".jh-landscape");
        if (landscape) {
          gsap.from(".jh-landscape-frame", {
            scale: 0.85,
            ease: "none",
            scrollTrigger: {
              trigger: landscape,
              start: "top bottom",
              end: "bottom center",
              scrub: true,
            },
          });
          gsap.from(".jh-landscape-image", {
            scale: 1.25,
            ease: "none",
            scrollTrigger: {
              trigger: landscape,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          });
        }
        const marquee = root.current!.querySelector(".jh-marquee");
        if (marquee) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: marquee,
              start: "top bottom",
              end: "top top",
              scrub: 2,
            },
          });
          tl.fromTo(
            ".jh-marquee-top",
            { xPercent: 80 },
            { xPercent: -5, ease: "none" },
          ).fromTo(
            ".jh-marquee-bottom",
            { xPercent: -80 },
            { xPercent: 5, ease: "none" },
            0,
          );
        }
        const grow = root.current!.querySelector(".jh-grow");
        if (grow) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: grow,
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
          tl.from(".jh-grow-visual", { scale: 0.5, ease: "none", duration: 1 })
            .from(
              ".jh-grow-photo",
              { scale: 1.5, ease: "none", duration: 1 },
              0,
            )
            .from(".jh-grow-shade", { opacity: 0, duration: 1 }, 0)
            .from(
              ".jh-grow-copy",
              { opacity: 0, scale: 0.8, duration: 0.5 },
              0.5,
            );
        }
        ScrollTrigger.refresh();
      }, root);
    });
    return () => {
      disposed = true;
      context?.revert();
      splits.forEach((split) => split.revert());
    };
  }, [reduced, route]);
  return root;
}
