// React Bits BlurText-TS-CSS adaptation. MIT + Commons Clause; /licenses/react-bits.txt.
// Retains word grouping, accessible copy and blur keyframes; project timing/runtime.
import { Children, isValidElement, useRef } from "react";
import type { ReactNode } from "react";
import { useInView } from "motion/react";
import { useSiteMotion } from "../../motion";
import { capsuleEase } from "../../design";
import * as m from "motion/react-m";

export default function BlurText({
  text,
  children,
  delay = 0,
  duration = 0.12,
  stagger = 0.0075,
  maxDelay = 0.03,
  className = "",
}: {
  text?: string;
  children?: ReactNode;
  delay?: number;
  duration?: number;
  stagger?: number;
  maxDelay?: number;
  className?: string;
}) {
  const reduced = useSiteMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.1 });
  const content = text ?? children;
  let index = 0;
  const pieces = (nodes: ReactNode): ReactNode =>
    Children.map(nodes, (node) => {
      if (typeof node === "string" || typeof node === "number")
        return String(node)
          .split(/(\s+)/)
          .map((word, i) => {
            if (/^\s*$/.test(word)) return word;
            const order = index++;
            return (
              <m.span
                key={`${i}-${word}`}
                className="rb-blur-word"
                initial={
                  reduced
                    ? false
                    : { opacity: 0.6, filter: "blur(3px)", y: "0.22em" }
                }
                animate={
                  reduced || seen
                    ? { opacity: 1, filter: "blur(0px)", y: 0 }
                    : undefined
                }
                transition={{
                  duration: reduced ? 0 : duration,
                  delay: reduced
                    ? 0
                    : Math.min(delay + order * stagger, maxDelay),
                  ease: capsuleEase,
                }}
              >
                {word}
              </m.span>
            );
          });
      if (isValidElement<{ children?: ReactNode }>(node) && node.type !== "br")
        return pieces(node.props.children);
      return node;
    });
  return (
    <span
      ref={ref}
      className={`rb-blur-text ${className}`}
      data-react-bits="blur-text"
    >
      <span className="sr-only">{content}</span>
      <span aria-hidden="true">{pieces(content)}</span>
    </span>
  );
}
