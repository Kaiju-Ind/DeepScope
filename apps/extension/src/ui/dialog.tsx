import * as DialogPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import X from "~icons/fluent/dismiss-24-regular";
import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, Show, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { Button } from "./button.tsx";
import { releaseBackgroundFocus } from "./modal-focus.ts";

/** Apply the shared background-focus policy before forwarding open changes, without adding another dialog state owner. */
const Dialog: Component<DialogPrimitive.DialogRootProps> = (props) => {
  const [local, others] = splitProps(props, ["onOpenChange"]);
  /** Release background focus for the new open state before notifying the caller's open-change handler. */
  const onOpenChange = (open: boolean) => {
    releaseBackgroundFocus(open);
    local.onOpenChange?.(open);
  };

  return <DialogPrimitive.Root data-slot="dialog" {...others} onOpenChange={onOpenChange} />;
};

type DialogTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogTriggerProps<T>
>;

/** Use the dialog primitive's trigger so activation remains connected to its open and focus owner. */
const DialogTrigger = <T extends ValidComponent = "button">(props: DialogTriggerProps<T>) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
};

/** Delegate content placement and portal lifetime to the dialog primitive. */
const DialogPortal = (props: DialogPrimitive.DialogPortalProps) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
};

type DialogCloseProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogCloseButtonProps<T>
>;

/** Forward primitive dismissal with an explicit or plain-text-derived accessible label. */
const DialogClose = <T extends ValidComponent = "button">(props: DialogCloseProps<T>) => {
  const [local, others] = splitProps(props as DialogCloseProps, ["aria-label", "children"]);
  /** Prefer the caller's accessible label and infer one only from plain string children. */
  const label = () => local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);
  return (
    <DialogPrimitive.CloseButton data-slot="dialog-close" aria-label={label()} {...others}>
      {local.children}
    </DialogPrimitive.CloseButton>
  );
};

type DialogOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Style the modal overlay while preserving the primitive's dismissal and presence behavior. */
const DialogOverlay = <T extends ValidComponent = "div">(props: DialogOverlayProps<T>) => {
  const [local, others] = splitProps(props as DialogOverlayProps, ["class"]);
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      class={cn("fixed inset-0 isolate z-50 z-dialog-overlay", local.class)}
      {...others}
    />
  );
};

type DialogContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    showCloseButton?: boolean;
  };

/** Portal a centered dialog with its overlay and a default close control; the primitive retains focus and dismissal ownership. */
const DialogContent = <T extends ValidComponent = "div">(props: DialogContentProps<T>) => {
  const mergedProps = mergeProps({ showCloseButton: true } as DialogContentProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "children", "showCloseButton"]);
  return (
    <DialogPortal>
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        class={cn(
          "fixed top-1/2 left-1/2 z-50 z-dialog-content w-full -translate-x-1/2 -translate-y-1/2 outline-hidden",
          local.class,
        )}
        {...others}
      >
        {local.children}
        <Show when={local.showCloseButton}>
          <DialogPrimitive.CloseButton
            as={Button}
            variant="ghost"
            size="icon-sm"
            data-slot="dialog-close"
            aria-label="Close"
            class="z-dialog-close"
          >
            <X />
            <span class="sr-only">Close</span>
          </DialogPrimitive.CloseButton>
        </Show>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
};

type DialogHeaderProps = ComponentProps<"div">;

/** Group the dialog heading and supporting content without creating another dialog or focus scope. */
const DialogHeader = (props: DialogHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="dialog-header"
      class={cn("z-dialog-header flex flex-col", local.class)}
      {...others}
    />
  );
};

type DialogFooterProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComponentProps<"div">
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    showCloseButton?: boolean;
  };

/** Arrange footer actions and optionally add a primitive-owned Close action, which is omitted by default. */
const DialogFooter = <T extends ValidComponent = "div">(props: DialogFooterProps<T>) => {
  const mergedProps = mergeProps({ showCloseButton: false } as DialogFooterProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "children", "showCloseButton"]);
  return (
    <div
      data-slot="dialog-footer"
      class={cn(
        "z-dialog-footer flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <Show when={local.showCloseButton}>
        <DialogPrimitive.CloseButton as={Button} variant="outline">
          Close
        </DialogPrimitive.CloseButton>
      </Show>
    </div>
  );
};

type DialogTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Connect the styled title to the dialog primitive's accessible naming relationship. */
const DialogTitle = <T extends ValidComponent = "h2">(props: DialogTitleProps<T>) => {
  const [local, others] = splitProps(props as DialogTitleProps, ["class"]);
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      class={cn("z-dialog-title z-font-heading", local.class)}
      {...others}
    />
  );
};

type DialogDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  DialogPrimitive.DialogDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Connect supporting text to the dialog primitive's accessible description relationship. */
const DialogDescription = <T extends ValidComponent = "p">(props: DialogDescriptionProps<T>) => {
  const [local, others] = splitProps(props as DialogDescriptionProps, ["class"]);
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      class={cn("z-dialog-description", local.class)}
      {...others}
    />
  );
};

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
