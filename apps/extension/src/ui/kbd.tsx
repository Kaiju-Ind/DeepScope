import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

type KbdProps = ComponentProps<"kbd">;

/** Display a non-interactive keyboard-key hint using native kbd semantics. */
const Kbd = (props: KbdProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <kbd
      class={cn(
        "pointer-events-none z-kbd inline-flex select-none items-center justify-center",
        local.class,
      )}
      data-slot="kbd"
      {...others}
    />
  );
};

type KbdGroupProps = ComponentProps<"div">;

/** Lay out adjacent key hints without registering or handling the displayed shortcut. */
const KbdGroup = (props: KbdGroupProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      class={cn("z-kbd-group inline-flex items-center", local.class)}
      data-slot="kbd-group"
      {...others}
    />
  );
};

export { Kbd, KbdGroup };
