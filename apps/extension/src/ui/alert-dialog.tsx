import * as AlertDialogPrimitive from "@kobalte/core/alert-dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { Button, type ButtonProps } from "./button.tsx";
import { releaseBackgroundFocus } from "./modal-focus.ts";

/** Keep alert-dialog state with the primitive while applying shared background-focus policy before caller notifications. */
const AlertDialog: Component<AlertDialogPrimitive.AlertDialogRootProps> = (props) => {
  const [local, others] = splitProps(props, ["onOpenChange"]);
  /** Release background focus for the new open state before forwarding the alert-dialog change. */
  const onOpenChange = (open: boolean) => {
    releaseBackgroundFocus(open);
    local.onOpenChange?.(open);
  };

  return (
    <AlertDialogPrimitive.Root data-slot="alert-dialog" {...others} onOpenChange={onOpenChange} />
  );
};

type AlertDialogTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogTriggerProps<T>
>;

/** Connect activation to the alert-dialog primitive without managing a separate open signal. */
const AlertDialogTrigger = <T extends ValidComponent = "button">(
  props: AlertDialogTriggerProps<T>,
) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />;
};

/** Use the alert-dialog primitive's portal and lifecycle for modal content. */
const AlertDialogPortal: Component<AlertDialogPrimitive.AlertDialogPortalProps> = (props) => {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />;
};

type AlertDialogOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Style the alert-dialog backdrop while leaving modal interaction policy with the primitive. */
const AlertDialogOverlay = <T extends ValidComponent = "div">(
  props: AlertDialogOverlayProps<T>,
) => {
  const [local, others] = splitProps(props as AlertDialogOverlayProps, ["class"]);
  return (
    <AlertDialogPrimitive.Overlay
      class={cn("fixed inset-0 z-50 z-alert-dialog-overlay", local.class)}
      data-slot="alert-dialog-overlay"
      {...others}
    />
  );
};

type AlertDialogContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogContentProps<T>
> &
  Pick<ComponentProps<T>, "class"> & { size?: "default" | "sm" };

/** Portal the centered alert dialog with its overlay and standard size unless the caller selects another size. */
const AlertDialogContent = <T extends ValidComponent = "div">(
  props: AlertDialogContentProps<T>,
) => {
  const mergedProps = mergeProps({ size: "default" } as AlertDialogContentProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "size"]);
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        class={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 z-alert-dialog-content grid w-full -translate-x-1/2 -translate-y-1/2 outline-hidden",
          local.class,
        )}
        data-size={local.size}
        data-slot="alert-dialog-content"
        {...others}
      />
    </AlertDialogPortal>
  );
};

type AlertDialogHeaderProps = ComponentProps<"div">;

/** Group the alert-dialog heading and explanation in the shared header slot. */
const AlertDialogHeader = (props: AlertDialogHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      class={cn("z-alert-dialog-header", local.class)}
      data-slot="alert-dialog-header"
      {...others}
    />
  );
};

type AlertDialogFooterProps = ComponentProps<"div">;

/** Arrange confirmation and cancellation actions using the dialog size and available width. */
const AlertDialogFooter = (props: AlertDialogFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-footer"
      class={cn(
        "z-alert-dialog-footer flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        local.class,
      )}
      {...others}
    />
  );
};

type AlertDialogMediaProps = ComponentProps<"div">;

/** Style optional alert media without deriving severity or choosing its icon. */
const AlertDialogMedia = (props: AlertDialogMediaProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="alert-dialog-media"
      class={cn("z-alert-dialog-media", local.class)}
      {...others}
    />
  );
};

type AlertDialogTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Associate the title with the alert-dialog primitive's accessible name. */
const AlertDialogTitle = <T extends ValidComponent = "h2">(props: AlertDialogTitleProps<T>) => {
  const [local, others] = splitProps(props as AlertDialogTitleProps, ["class"]);
  return (
    <AlertDialogPrimitive.Title
      class={cn("z-alert-dialog-title z-font-heading", local.class)}
      data-slot="alert-dialog-title"
      {...others}
    />
  );
};

type AlertDialogDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Associate explanatory text with the alert-dialog primitive's accessible description. */
const AlertDialogDescription = <T extends ValidComponent = "p">(
  props: AlertDialogDescriptionProps<T>,
) => {
  const [local, others] = splitProps(props as AlertDialogDescriptionProps, ["class"]);
  return (
    <AlertDialogPrimitive.Description
      class={cn("z-alert-dialog-description", local.class)}
      data-slot="alert-dialog-description"
      {...others}
    />
  );
};

type AlertDialogActionProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T>
> &
  Pick<ButtonProps, "variant" | "size" | "class">;

/** Use the standard button appearance for a primitive close action; the caller owns the confirmed operation and its errors. */
const AlertDialogAction = <T extends ValidComponent = "button">(
  props: AlertDialogActionProps<T>,
) => {
  const mergedProps = mergeProps({ variant: "default", size: "default" }, props);
  const [local, others] = splitProps(mergedProps as AlertDialogActionProps, [
    "aria-label",
    "children",
    "class",
    "variant",
    "size",
  ]);
  /** Prefer an explicit accessible label and infer one only when the button's children are plain text. */
  const label = () => local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);
  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      size={local.size}
      variant={local.variant}
      data-slot="alert-dialog-action"
      aria-label={label()}
      class={cn("z-alert-dialog-action", local.class)}
      {...others}
    >
      {local.children}
    </AlertDialogPrimitive.CloseButton>
  );
};

type AlertDialogCancelProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  AlertDialogPrimitive.AlertDialogCloseButtonProps<T>
> &
  Pick<ButtonProps, "variant" | "size" | "class">;

/** Use the outline appearance for cancellation while letting the primitive perform dialog dismissal. */
const AlertDialogCancel = <T extends ValidComponent = "button">(
  props: AlertDialogCancelProps<T>,
) => {
  const mergedProps = mergeProps({ variant: "outline", size: "default" }, props);
  const [local, others] = splitProps(mergedProps as AlertDialogCancelProps, [
    "aria-label",
    "children",
    "class",
    "variant",
    "size",
  ]);
  /** Prefer an explicit accessible label and infer one only when the button's children are plain text. */
  const label = () => local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);
  return (
    <AlertDialogPrimitive.CloseButton
      as={Button}
      size={local.size}
      variant={local.variant}
      data-slot="alert-dialog-cancel"
      aria-label={label()}
      class={cn("z-alert-dialog-cancel", local.class)}
      {...others}
    >
      {local.children}
    </AlertDialogPrimitive.CloseButton>
  );
};

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
