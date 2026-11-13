import { useSiteMotion } from "./motion";
import { useCallback, useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import useEmblaCarousel from "embla-carousel-react";

type Options = Parameters<typeof useEmblaCarousel>[0];
type Api = NonNullable<ReturnType<typeof useEmblaCarousel>[1]>;
export function usePremiumCarousel(options: Options = {}) {
  const reduced = useSiteMotion();
  const [viewport, api] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: reduced ? 0 : 32,
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
