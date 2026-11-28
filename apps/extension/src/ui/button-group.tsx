import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { Separator } from "./separator.tsx";

const buttonGroupVariants = cva(
  "z-button-group flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal:
          "z-button-group-orientation-horizontal *:data-slot:rounded-r-none [&>[data-slot]~[data-slot]]:rounded-l-none [&>[data-slot]~[data-slot]]:border-l-0",
        vertical:
          "z-button-group-orientation-vertical flex-col *:data-slot:rounded-b-none [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  },
);

type ButtonGroupProps = ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>;

/** Group caller-owned controls horizontally by default and expose orientation to the shared styles. */
const ButtonGroup = (props: ButtonGroupProps) => {
  const [local, others] = splitProps(props, ["class", "orientation"]);
  return (
    // biome-ignore lint/a11y/useSemanticElements: <exception for button group>
    <div
      class={cn(buttonGroupVariants({ orientation: local.orientation }), local.class)}
      data-orientation={local.orientation ?? "horizontal"}
      data-slot="button-group"
      role="group"
      {...others}
    />
  );
};

type ButtonGroupTextProps = ComponentProps<"div">;

/** Place non-interactive text alongside grouped buttons without adding button behavior. */
const ButtonGroupText = (props: ButtonGroupTextProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="button-group-text"
      class={cn("z-button-group-text flex items-center [&_svg]:pointer-events-none", local.class)}
      {...others}
    />
  );
};

type ButtonGroupSeparatorProps = ComponentProps<typeof Separator>;

/** Separate grouped controls vertically by default while forwarding the separator primitive's semantics. */
const ButtonGroupSeparator = (props: ButtonGroupSeparatorProps) => {
  const mergedProps = mergeProps({ orientation: "vertical" } as const, props);
  const [local, others] = splitProps(mergedProps, ["class", "orientation"]);
  return (
    <Separator
      class={cn(
        "relative z-button-group-separator self-stretch data-[orientation=horizontal]:mx-px data-[orientation=vertical]:my-px data-[orientation=vertical]:h-auto data-[orientation=horizontal]:w-auto",
        local.class,
      )}
      data-slot="button-group-separator"
      orientation={local.orientation}
      {...others}
    />
  );
};

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
