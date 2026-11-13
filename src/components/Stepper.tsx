// Adapted from DavidHDev/react-bits, Stepper-TS-CSS, 13 November 2026.
// MIT + Commons Clause: /licenses/react-bits.txt. Original retained in
// .codex/react-bits/reviews/Stepper-TS-CSS.json; see docs/enquiry-redesign.
import { Children, isValidElement, useEffect, useRef } from "react";
import type { ReactElement, ReactNode } from "react";
import { AnimatePresence, useIsPresent } from "motion/react";
import * as m from "motion/react-m";
import { Check } from "lucide-react";
import { useSiteMotion } from "../motion";
import "./Stepper.css";

interface StepProps {
  children: ReactNode;
  title: string;
}
export function Step({ children }: StepProps) {
  return <>{children}</>;
}

function Pane({
  children,
  direction,
  step,
  focus,
}: {
  children: ReactNode;
  direction: number;
  step: number;
  focus: boolean;
}) {
  const present = useIsPresent();
  const reduced = useSiteMotion();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const dialog = ref.current?.closest<HTMLDialogElement>("dialog");
    dialog?.scrollTo({ top: 0, behavior: "instant" });
    ref.current
      ?.closest<HTMLElement>(".enquiry-main")
      ?.scrollTo({ top: 0, behavior: "instant" });
    if (focus)
      ref.current
        ?.querySelector<HTMLElement>("[data-step-title]")
        ?.focus({ preventScroll: !!dialog });
  }, [step, focus]);
  return (
    <m.div
      ref={ref}
      className="stepper__pane"
      inert={!present}
      data-step={step}
      initial={{ opacity: 0, x: reduced ? 0 : direction * 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: reduced ? 0 : direction * -8 }}
      transition={{
        duration: reduced ? 0.12 : present ? 0.35 : 0.14,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </m.div>
  );
}

/** Controlled linear form adaptation, with no demo completion or hidden live fields. */
export default function Stepper({
  children,
  step,
  reached,
  onStepChange,
}: {
  children: ReactNode;
  step: number;
  reached: number;
  onStepChange: (step: number) => void;
}) {
  const steps = Children.toArray(children).filter(
    isValidElement,
  ) as ReactElement<StepProps>[];
  const previous = useRef(step);
  const mounted = useRef(false);
  useEffect(() => {
    mounted.current = true;
  }, []);
  const direction = step >= previous.current ? 1 : -1;
  useEffect(() => {
    previous.current = step;
  }, [step]);
  return (
    <div className="stepper">
      <nav className="stepper__track" aria-label="Stay enquiry steps">
        {steps.map((entry, index) => {
          const number = index + 1;
          const status =
            number < step
              ? "complete"
              : number === step
                ? "active"
                : "upcoming";
          return (
            <button
              key={number}
              type="button"
              className="stepper__segment"
              data-status={status}
              aria-label={`Step ${number}: ${entry.props.title}`}
              aria-current={number === step ? "step" : undefined}
              disabled={number > reached}
              onClick={() => onStepChange(number)}
            >
              <span className="stepper__badge" aria-hidden="true">
                {status === "complete" ? <Check size={13} /> : `0${number}`}
              </span>
              <span>{entry.props.title}</span>
              <span className="stepper__bar-fill" aria-hidden="true" />
            </button>
          );
        })}
      </nav>
      <div className="stepper__viewport">
        <AnimatePresence mode="wait" initial={false}>
          <Pane
            key={step}
            direction={direction}
            step={step}
            focus={mounted.current}
          >
            {steps[step - 1]}
          </Pane>
        </AnimatePresence>
      </div>
    </div>
  );
}
