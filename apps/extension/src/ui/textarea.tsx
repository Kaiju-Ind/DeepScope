import { type ComponentProps, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

type TextareaProps = ComponentProps<"textarea">;

/** Style a native content-sized textarea while keeping value, selection, input events and form ownership with the caller. */
const Textarea = (props: TextareaProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <textarea
      data-slot="textarea"
      class={cn(
        "field-sizing-content z-textarea flex min-h-16 w-full outline-hidden",
        local.class,
      )}
      {...others}
    />
  );
};

export { Textarea, type TextareaProps };
