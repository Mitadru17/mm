import { useSiteMotion } from "../../motion";
/**
 * Adapted from React Bits BlurText-TS-CSS (DavidHDev/react-bits).
 * https://reactbits.dev/r/BlurText-TS-CSS.json
 * MIT + Commons Clause; see public/licenses/react-bits.txt.
 * Narrowed to a one-shot word reveal, sharing the site's existing Motion runtime.
 */
import * as m from "motion/react-m";

export default function BlurText({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const reduced = useSiteMotion();
  return (
    <span className={`rb-blur-text ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split(" ").map((word, index, words) => (
          <m.span
            key={`${word}-${index}`}
            className="rb-blur-word"
            initial={
              reduced ? false : { opacity: 0.85, filter: "blur(2px)", y: 12 }
            }
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: reduced ? 0 : 0.85,
              delay: reduced ? 0 : delay + index * 0.07,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {index < words.length - 1 ? "\u00a0" : ""}
          </m.span>
        ))}
      </span>
    </span>
  );
}
