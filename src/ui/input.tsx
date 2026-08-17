import { type ComponentProps, splitProps } from "solid-js";

import { cn } from "@/utils/cn";

type InputProps = ComponentProps<"input">;

const Input = (props: InputProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <input
      data-slot="input"
      class={cn(
        "z-input w-full min-w-0 outline-hidden file:inline-flex file:border-0 file:bg-transparent file:text-white",
        local.class,
      )}
      {...others}
    />
  );
};

export { Input, type InputProps };
