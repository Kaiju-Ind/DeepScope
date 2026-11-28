import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

/** Style a caller-sized loading placeholder; the caller decides loading state and accessible announcements. */
const Skeleton = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div class={cn("z-skeleton", local.class)} data-slot="skeleton" {...others} />
  );
};

export { Skeleton };
