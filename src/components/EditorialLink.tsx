import type { ComponentPropsWithoutRef } from "react";
import { ArrowUpRight } from "lucide-react";

/** Original hotel link: a steady underline and a small directional affordance. */
export function EditorialLink({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a {...props} className={`editorial-link ${className}`}>
      <span>{children}</span>
      <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.2} />
    </a>
  );
}
