import { useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import { useSiteMotion } from "../motion";
import { capsuleDuration, capsuleEase } from "../design";

/** Native disclosure semantics with interruptible, measured 150ms height motion. */
export function ReactiveDetails({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const ref = useRef<HTMLDetailsElement>(null);
  const animation = useRef<Animation | null>(null);
  const requested = useRef(index === 0);
  const reduced = useSiteMotion();
  useEffect(() => {
    const details = ref.current;
    const settle = () => {
      animation.current?.cancel();
      animation.current = null;
      if (!details) return;
      details.open = requested.current;
      details.style.removeProperty("height");
      details.style.removeProperty("overflow");
    };
    if (reduced) settle();
    return settle;
  }, [reduced]);
  const toggle = () => {
    const details = ref.current!;
    const start = details.getBoundingClientRect().height;
    requested.current = !requested.current;
    animation.current?.cancel();
    animation.current = null;
    details.style.removeProperty("height");
    if (reduced) {
      details.open = requested.current;
      return;
    }
    // Keep content rendered throughout collapse, then restore native closed state.
    details.open = true;
    const style = getComputedStyle(details);
    const end = requested.current
      ? details.getBoundingClientRect().height
      : details.querySelector("summary")!.getBoundingClientRect().height +
        parseFloat(style.borderTopWidth) +
        parseFloat(style.borderBottomWidth);
    details.style.overflow = "clip";
    const current = details.animate(
      [{ height: `${start}px` }, { height: `${end}px` }],
      {
        duration: capsuleDuration * 1000,
        easing: `cubic-bezier(${capsuleEase.join(",")})`,
        fill: "both",
      },
    );
    animation.current = current;
    void current.finished
      .then(() => {
        if (animation.current !== current) return;
        details.open = requested.current;
        current.cancel();
        animation.current = null;
        details.style.removeProperty("height");
        details.style.removeProperty("overflow");
      })
      .catch(() => {
        /* A second click or route change cancels the previous tween. */
      });
  };
  return (
    <details ref={ref} open={index === 0}>
      <summary
        onClick={(event) => {
          event.preventDefault();
          toggle();
        }}
      >
        <span>
          {index + 1}. {question}
        </span>
        <Plus size={28} />
      </summary>
      <p>{answer}</p>
    </details>
  );
}
