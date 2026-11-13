// Adapted from Vengeance UI's MIT HoverCard registry item (Ashutoshx7/VengeanceUI).
// Source and complete license: /public/licenses/vengeance-ui.txt.
import * as Primitive from "@radix-ui/react-hover-card";
import type { ComponentProps } from "react";

export const HoverCard = Primitive.Root;
export const HoverCardTrigger = Primitive.Trigger;
export function HoverCardContent({
  className = "",
  align = "center",
  sideOffset = 11.25,
  ...props
}: ComponentProps<typeof Primitive.Content>) {
  return (
    <Primitive.Portal>
      <Primitive.Content
        align={align}
        sideOffset={sideOffset}
        collisionPadding={15}
        className={`vui-hover-card glass-surface ${className}`}
        {...props}
      />
    </Primitive.Portal>
  );
}
