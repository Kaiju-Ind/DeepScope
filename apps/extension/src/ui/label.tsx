import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";

type LabelProps = ComponentProps<"label">;

/** Style a native label and forward its control association; the caller supplies the matching control ID. */
const Label = (props: LabelProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <label
      class={cn(
        "z-label flex select-none items-center peer-disabled:cursor-not-allowed group-data-[disabled=true]:pointer-events-none",
        local.class,
      )}
      data-slot="label"
      {...others}
    />
  );
};

export { Label };
