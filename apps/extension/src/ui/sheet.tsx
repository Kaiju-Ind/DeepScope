import * as SheetPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import X from "~icons/fluent/dismiss-24-regular";
import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, Show, splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";
import { Button } from "./button.tsx";
import { releaseBackgroundFocus } from "./modal-focus.ts";

/** Apply shared background-focus policy while retaining the dialog primitive as the sheet's open-state owner. */
const Sheet: Component<SheetPrimitive.DialogRootProps> = (props) => {
  const [local, others] = splitProps(props, ["onOpenChange"]);
  /** Release background focus for the new sheet state before notifying the caller. */
  const onOpenChange = (open: boolean) => {
    releaseBackgroundFocus(open);
    local.onOpenChange?.(open);
  };

  return <SheetPrimitive.Root data-slot="sheet" {...others} onOpenChange={onOpenChange} />;
};

type SheetTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogTriggerProps<T>
>;

/** Open the surrounding sheet through the primitive's activation and focus behavior. */
const SheetTrigger = <T extends ValidComponent = "button">(props: SheetTriggerProps<T>) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

type SheetCloseProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogCloseButtonProps<T>
>;

/** Close the sheet through the primitive and preserve an explicit or plain-text-derived accessible label. */
const SheetClose = <T extends ValidComponent = "button">(props: SheetCloseProps<T>) => {
  const [local, others] = splitProps(props as SheetCloseProps, ["aria-label", "children"]);
  /** Use aria-label when supplied and infer a label only from plain string children. */
  const label = () => local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);
  return (
    <SheetPrimitive.CloseButton data-slot="sheet-close" aria-label={label()} {...others}>
      {local.children}
    </SheetPrimitive.CloseButton>
  );
};

/** Keep sheet portal placement and presence with the dialog primitive. */
const SheetPortal = (props: SheetPrimitive.DialogPortalProps) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

type SheetOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Style the sheet backdrop without replacing the primitive's modal interaction policy. */
const SheetOverlay = <T extends ValidComponent = "div">(props: SheetOverlayProps<T>) => {
  const [local, others] = splitProps(props as SheetOverlayProps, ["class"]);
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      class={cn("fixed inset-0 z-50 z-sheet-overlay", local.class)}
      {...others}
    />
  );
};

type SheetContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    side?: "top" | "right" | "bottom" | "left";
    showCloseButton?: boolean;
  };

/** Portal side-positioned content with a right-side default and optional close button; focus remains with the dialog primitive. */
const SheetContent = <T extends ValidComponent = "div">(props: SheetContentProps<T>) => {
  const mergedProps = mergeProps(
    { side: "right", showCloseButton: true } as SheetContentProps,
    props,
  );
  const [local, others] = splitProps(mergedProps, ["class", "children", "side", "showCloseButton"]);
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        data-side={local.side}
        class={cn(
          "fixed z-50 z-sheet-content flex max-h-dvh flex-col overflow-y-auto outline-hidden " +
            "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-full data-[side=right]:border-l sm:data-[side=right]:w-96 " +
            "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-full data-[side=left]:border-r sm:data-[side=left]:w-96 " +
            "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:max-h-[85dvh] data-[side=top]:w-full data-[side=top]:border-b " +
            "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:w-full data-[side=bottom]:border-t",
          local.class,
        )}
        {...others}
      >
        {local.children}
        <Show when={local.showCloseButton}>
          <SheetPrimitive.CloseButton
            as={Button}
            variant="ghost"
            size="icon-sm"
            data-slot="sheet-close"
            aria-label="Close"
            class="z-sheet-close"
          >
            <X />
            <span class="sr-only">Close</span>
          </SheetPrimitive.CloseButton>
        </Show>
      </SheetPrimitive.Content>
    </SheetPortal>
  );
};

type SheetHeaderProps = ComponentProps<"div">;

/** Group the sheet's heading and descriptive content in the shared header slot. */
const SheetHeader = (props: SheetHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sheet-header"
      class={cn("z-sheet-header flex flex-col", local.class)}
      {...others}
    />
  );
};

type SheetFooterProps = ComponentProps<"div">;

/** Place caller-owned footer actions after the sheet's main content. */
const SheetFooter = (props: SheetFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sheet-footer"
      class={cn("z-sheet-footer mt-auto flex flex-col", local.class)}
      {...others}
    />
  );
};

type SheetTitleProps<T extends ValidComponent = "h2"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogTitleProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Associate the styled title with the sheet's underlying dialog label. */
const SheetTitle = <T extends ValidComponent = "h2">(props: SheetTitleProps<T>) => {
  const [local, others] = splitProps(props as SheetTitleProps, ["class"]);
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      class={cn("z-font-heading z-sheet-title", local.class)}
      {...others}
    />
  );
};

type SheetDescriptionProps<T extends ValidComponent = "p"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogDescriptionProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Associate supporting text with the sheet's underlying dialog description. */
const SheetDescription = <T extends ValidComponent = "p">(props: SheetDescriptionProps<T>) => {
  const [local, others] = splitProps(props as SheetDescriptionProps, ["class"]);
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      class={cn("z-sheet-description", local.class)}
      {...others}
    />
  );
};

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
};
