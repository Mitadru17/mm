// Adapted from Skiper UI's FREE CssLink (skiper40), Link001 / Gxuri.
// https://skiper-ui.com/v1/skiper40 — attribution/usage: public/licenses/skiper-ui.txt.
// Next.js/Tailwind replaced by a native anchor and Capsules CSS; timing is 150ms.
import type { ComponentPropsWithoutRef } from "react";

export function SkiperLink({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a"> & { href: string }) {
  return (
    <a {...props} className={`skiper-css-link ${className}`}>
      <span className="skiper-link-label">{children}</span>
      <svg
        className="skiper-link-arrow"
        viewBox="0 0 10 10"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </a>
  );
}
