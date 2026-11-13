// Adapted from Vengeance UI GlassDock, MIT; see public/licenses/vengeance-ui.txt.
// Uses semantic buttons, the existing Motion runtime, and the site's timing tokens.
import { useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { useSiteMotion } from "../../motion";
import { capsuleDuration, capsuleEase } from "../../design";

export type DockItem = {
  id: string;
  label: string;
  icon: ReactNode;
  onClick: () => void;
  active?: boolean;
};
export function GlassDock({
  items,
  label,
}: {
  items: DockItem[];
  label: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useSiteMotion();
  return (
    <div
      className="vui-glass-dock glass-surface"
      role="group"
      aria-label={label}
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item) => (
        <div className="vui-dock-item" key={item.id}>
          <button
            aria-label={item.label}
            aria-pressed={item.active}
            onClick={item.onClick}
            onMouseEnter={() => setHovered(item.id)}
            onFocus={() => setHovered(item.id)}
            onBlur={() => setHovered(null)}
          >
            <m.span
              animate={{
                y: !reduced && hovered === item.id ? -3.75 : 0,
                scale: !reduced && hovered === item.id ? 1.06 : 1,
              }}
              transition={{
                duration: reduced ? 0 : capsuleDuration,
                ease: capsuleEase,
              }}
            >
              {item.icon}
            </m.span>
          </button>
          <AnimatePresence>
            {hovered === item.id && (
              <m.span
                className="vui-dock-tooltip"
                aria-hidden="true"
                initial={{ opacity: 0, y: reduced ? 0 : 7.5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : 3.75 }}
                transition={{
                  duration: reduced ? 0 : capsuleDuration,
                  ease: capsuleEase,
                }}
              >
                {item.label}
              </m.span>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
