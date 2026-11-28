import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, type JSX, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { Button, type ButtonProps } from "./button.tsx";
import { Input } from "./input.tsx";
import { Textarea } from "./textarea.tsx";

type InputGroupProps = ComponentProps<"div">;

/** Group a native control with its addons and adapt layout to block addons without owning the control's value. */
const InputGroup = (props: InputGroupProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    // biome-ignore lint/a11y/useSemanticElements: <exception for input group>
    <div
      data-slot="input-group"
      role="group"
      class={cn(
        "group/input-group relative z-input-group flex w-full min-w-0 items-center outline-hidden has-[>textarea]:h-auto has-[[data-align=block-start]]:flex-col has-[[data-align=block-end]]:flex-col has-[[data-align=block-start]]:items-stretch has-[[data-align=block-end]]:items-stretch",
        local.class,
      )}
      {...others}
    />
  );
};

const inputGroupAddonVariants = cva(
  "z-input-group-addon flex cursor-text select-none items-center justify-center",
  {
    variants: {
      align: {
        "inline-start": "z-input-group-addon-align-inline-start order-first",
        "inline-end": "z-input-group-addon-align-inline-end order-last",
        "block-start": "z-input-group-addon-align-block-start order-first w-full justify-start",
        "block-end": "z-input-group-addon-align-block-end order-last w-full justify-start",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

type InputGroupAddonProps = ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>;

/** Align supplementary content and delegate non-button clicks to the neighboring input's focus. */
const InputGroupAddon = (props: InputGroupAddonProps) => {
  const [local, others] = splitProps(props, ["class", "align", "onClick"]);
  /** Default addons to the inline start while keeping the caller's reactive alignment choice. */
  const align = () => local.align ?? "inline-start";

  /** Leave nested buttons alone; other addon clicks focus the sibling input before invoking a function-valued caller handler. */
  const handleClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (e) => {
    if ((e.target as HTMLElement).closest("button")) {
      return;
    }
    e.currentTarget.parentElement?.querySelector("input")?.focus();
    if (typeof local.onClick === "function") {
      local.onClick(e);
    }
  };

  return (
    // biome-ignore lint/a11y/useSemanticElements: <exception for input group addon>
    // biome-ignore lint/a11y/useKeyWithClickEvents: <click delegates focus to input>
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align()}
      class={cn(inputGroupAddonVariants({ align: align() }), local.class)}
      onClick={handleClick}
      {...others}
    />
  );
};

const inputGroupButtonVariants = cva("z-input-group-button flex items-center shadow-none", {
  variants: {
    size: {
      xs: "z-input-group-button-size-xs",
      sm: "z-input-group-button-size-sm",
      "icon-xs": "z-input-group-button-size-icon-xs",
      "icon-sm": "z-input-group-button-size-icon-sm",
    },
  },
  defaultVariants: {
    size: "xs",
  },
});

type InputGroupButtonProps = Omit<ButtonProps, "size"> &
  VariantProps<typeof inputGroupButtonVariants> & {
    type?: "button" | "submit" | "reset";
  };

/** Use compact ghost-button defaults and avoid implicit form submission unless the caller requests another type. */
const InputGroupButton = (props: InputGroupButtonProps) => {
  const [local, others] = splitProps(props, ["class", "type", "variant", "size"]);
  /** Default grouped actions to the compact xs appearance while retaining reactive caller sizing. */
  const size = () => local.size ?? "xs";
  /** Default grouped actions to ghost styling so the input group's outer surface remains primary. */
  const variant = () => local.variant ?? "ghost";
  /** Default grouped buttons to a non-submit action; callers must opt into submission behavior. */
  const type = () => local.type ?? "button";

  return (
    <Button
      type={type()}
      data-size={size()}
      variant={variant()}
      class={cn(inputGroupButtonVariants({ size: size() }), local.class)}
      {...others}
    />
  );
};

type InputGroupTextProps = ComponentProps<"span">;

/** Align non-interactive addon text and icons without affecting the control's form state. */
const InputGroupText = (props: InputGroupTextProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      class={cn("z-input-group-text flex items-center [&_svg]:pointer-events-none", local.class)}
      {...others}
    />
  );
};

type InputGroupInputProps = ComponentProps<"input">;

/** Use the shared input's bare surface so the surrounding group owns the visual border and background. */
const InputGroupInput = (props: InputGroupInputProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Input
      surface="bare"
      data-slot="input-group-control"
      class={cn("z-input-group-input flex-1", local.class)}
      {...others}
    />
  );
};

type InputGroupTextareaProps = ComponentProps<"textarea">;

/** Compose a vertically resizable multiline control while leaving value and input events with the caller. */
const InputGroupTextarea = (props: InputGroupTextareaProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Textarea
      data-slot="input-group-control"
      class={cn("z-input-group-textarea min-h-24 w-full flex-none resize-y", local.class)}
      {...others}
    />
  );
};

export {
  InputGroup,
  InputGroupAddon,
  type InputGroupAddonProps,
  InputGroupButton,
  type InputGroupButtonProps,
  InputGroupInput,
  type InputGroupInputProps,
  type InputGroupProps,
  InputGroupText,
  InputGroupTextarea,
  type InputGroupTextareaProps,
  type InputGroupTextProps,
};
