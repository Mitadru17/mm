import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { animate } from "motion/mini";
import { cubicBezier } from "motion";
import { capsuleDuration, capsuleEase } from "./design";
import { gsap, ScrollTrigger, referenceMotion } from "./bend/animation";
const scrollEase = cubicBezier(...capsuleEase);
let smooth: Lenis | undefined;
let anchorDuration = capsuleDuration;
export function scrollPageTo(top: number, immediate = false) {
  if (smooth) {
    smooth.resize();
    smooth.scrollTo(top, { immediate, force: true });
  } else window.scrollTo({ top, behavior: immediate ? "instant" : "smooth" });
}
export function resetPageScroll(hash = "") {
  const target = hash
    ? document.getElementById(decodeURIComponent(hash.replace(/^#/, "")))
    : null;
  scrollPageTo(
    target ? target.getBoundingClientRect().top + window.scrollY : 0,
    true,
  );
}
export function goTo(id: string, focusSelector?: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const done = () => {
    if (focusSelector)
      document
        .querySelector<HTMLElement>(focusSelector)
        ?.focus({ preventScroll: true });
  };
  if (smooth)
    smooth.scrollTo(element, { duration: anchorDuration, onComplete: done });
  else {
    element.scrollIntoView({
      behavior:
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.dataset.motionReduced === "true"
          ? "instant"
          : "smooth",
    });
    requestAnimationFrame(done);
  }
}
export function useSmoothExperience(duration = capsuleDuration) {
  useEffect(() => {
    anchorDuration = duration;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reduced = () =>
      preference.matches ||
      document.documentElement.dataset.motionReduced === "true";
    const onSmoothScroll = () => ScrollTrigger.update();
    const init = () => {
      gsap.ticker.remove(tick);
      smooth?.off("scroll", onSmoothScroll);
      smooth?.destroy();
      smooth = undefined;
      if (!reduced())
        smooth = new Lenis({
          autoRaf: false,
          duration,
          easing:
            duration === referenceMotion.scroll
              ? referenceMotion.scrollEase
              : scrollEase,
          smoothWheel: true,
          syncTouch: false,
          anchors: false,
          prevent: (node) => !!node.closest("dialog,[data-lenis-prevent]"),
        });
      if (smooth) {
        smooth.on("scroll", onSmoothScroll);
        gsap.ticker.add(tick);
      }
    };
    const tick = (seconds: number) => smooth?.raf(seconds * 1000);
    init();
    preference.addEventListener("change", init);
    document.addEventListener("mystic-motion-change", init);
    // Intercept same-page links once. Native fragment jumps must not race Lenis,
    // and a mobile overlay must release its scroll lock before navigation starts.
    const navigate = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return;
      const anchor = (
        event.target as Element | null
      )?.closest<HTMLAnchorElement>("a[href]");
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href, location.href);
      if (
        url.origin !== location.origin ||
        url.pathname !== location.pathname ||
        !url.hash
      )
        return;
      let id: string;
      try {
        id = decodeURIComponent(url.hash.slice(1));
      } catch {
        return;
      }
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      requestAnimationFrame(() => {
        goTo(id);
        if (event.detail === 0) {
          target.tabIndex = -1;
          target.focus({ preventScroll: true });
        }
      });
    };
    const restore = () => {
      try {
        goTo(decodeURIComponent(location.hash.slice(1) || "home"));
      } catch {
        // Leave malformed external fragments at the current position.
      }
    };
    let disposed = false;
    // React renders after the browser's first fragment lookup. Resolve deep
    // links after local fonts settle so the destination uses its final layout.
    void document.fonts.ready.then(() => {
      if (disposed || !location.hash) return;
      requestAnimationFrame(() => {
        if (disposed) return;
        try {
          const target = document.getElementById(
            decodeURIComponent(location.hash.slice(1)),
          );
          if (!target) return;
          if (smooth) {
            smooth.resize();
            smooth.scrollTo(target, { immediate: true });
          } else target.scrollIntoView({ behavior: "instant" });
        } catch {
          // Invalid fragments should never interrupt page initialization.
        }
      });
    });
    document.addEventListener("click", navigate);
    window.addEventListener("popstate", restore);
    const overlay = new MutationObserver(() => {
      if (document.body.style.overflow === "hidden") smooth?.stop();
      else smooth?.start();
    });
    overlay.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });
    const entrances: ReturnType<typeof animate>[] = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (!reduced())
              entrances.push(
                animate(
                  entry.target as HTMLElement,
                  {
                    opacity: [0, 1],
                    transform: ["translateY(20px)", "translateY(0px)"],
                  },
                  { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
                ),
              );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((e) => observer.observe(e));
    return () => {
      disposed = true;
      gsap.ticker.remove(tick);
      smooth?.off("scroll", onSmoothScroll);
      smooth?.destroy();
      smooth = undefined;
      preference.removeEventListener("change", init);
      document.removeEventListener("mystic-motion-change", init);
      overlay.disconnect();
      observer.disconnect();
      document.removeEventListener("click", navigate);
      window.removeEventListener("popstate", restore);
      entrances.forEach((animation) => animation.stop());
    };
  }, [duration]);
}
