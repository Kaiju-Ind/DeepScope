import LoaderCircle from "~icons/fluent/arrow-clockwise-24-regular";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "@/utils/cn";

type SpinnerProps = ComponentProps<"svg"> & {
  class?: string | undefined;
};

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
