import { useSiteMotion } from "./motion";
import { useCallback, useEffect, useState } from "react";
import { animate } from "motion/mini";
import { capsuleDuration, capsuleEase } from "./design";
import type { KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Options = Parameters<typeof useEmblaCarousel>[0];
type Api = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
export function usePremiumCarousel(options: Options = {}) {
  const reduced = useSiteMotion();
  const [viewport, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    // Embla's duration is a spring parameter, not seconds. Snap immediately
    // so its settling tail cannot exceed DESIGN.md's 150ms interaction limit.
    // Pointer dragging remains continuous; selection feedback fades in 150ms.
    duration: 0,
    dragThreshold: 8,
    skipSnaps: false,
    ...options,
  });
  const [state, setState] = useState({
    index: 0,
    total: 0,
    prev: false,
    next: false,
    visible: [0] as number[],
  });
  const update = useCallback((embla: Api) => {
    setState({
      index: embla.selectedScrollSnap(),
      total: embla.scrollSnapList().length,
      prev: embla.canScrollPrev(),
      next: embla.canScrollNext(),
      visible: embla.slidesInView(),
    });
  }, []);
  useEffect(() => {
    if (!api) return;
    update(api);
    api.on("select", update).on("reInit", update).on("slidesInView", update);
    return () => {
      api
        .off("select", update)
        .off("reInit", update)
        .off("slidesInView", update);
    };
  }, [api, update]);
  useEffect(() => {
    if (!api || reduced) return;
    let feedback: ReturnType<typeof animate> | undefined;
    let activePhoto: HTMLElement | undefined;
    let previousIndex = api.selectedScrollSnap();
    const resetFeedback = () => {
      feedback?.stop();
      activePhoto?.style.removeProperty("opacity");
      activePhoto?.style.removeProperty("transform");
    };
    const respond = (embla: Api) => {
      resetFeedback();
      const index = embla.selectedScrollSnap();
      const total = embla.scrollSnapList().length;
      const forward = (index - previousIndex + total) % total;
      const direction = forward <= total / 2 ? 1 : -1;
      previousIndex = index;
      const photo = embla
        .slideNodes()
        [embla.selectedScrollSnap()]?.querySelector<HTMLElement>(".ts-photo");
      if (photo) {
        activePhoto = photo;
        feedback = animate(
          photo,
          {
            opacity: [0.65, 1],
            transform: [
              `translateX(${direction * 15}px) scale(1.035)`,
              "translateX(0px) scale(1)",
            ],
          },
          { duration: capsuleDuration, ease: capsuleEase },
        );
      }
    };
    api.on("select", respond);
    return () => {
      api.off("select", respond);
      resetFeedback();
    };
  }, [api, reduced]);
  const prev = () => api?.scrollPrev(!!reduced);
  const next = () => api?.scrollNext(!!reduced);
  const to = (index: number) => api?.scrollTo(index, !!reduced);
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      prev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    } else if (event.key === "Home") {
      event.preventDefault();
      to(0);
    } else if (event.key === "End") {
      event.preventDefault();
      to(Math.max(0, state.total - 1));
    }
  };
  return { viewport, api, state, prev, next, to, onKeyDown };
}
