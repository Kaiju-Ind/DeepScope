import LoaderCircle from "~icons/fluent/arrow-clockwise-24-regular";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

type SpinnerProps = ComponentProps<"svg"> & {
  class?: string | undefined;
};

/** Provide a default Loading status label and spinning icon while forwarding caller-provided icon and accessibility props. */
const Spinner = (props: SpinnerProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <LoaderCircle
      role="status"
      aria-label="Loading"
      class={cn("z-spinner size-4 animate-spin", local.class)}
      data-slot="spinner"
      {...others}
    />
  );
};

export { Spinner };
