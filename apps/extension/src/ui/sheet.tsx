import * as SheetPrimitive from "@kobalte/core/dialog";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import X from "~icons/fluent/dismiss-24-regular";
import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, Show, splitProps } from "solid-js";
import { cn } from "@/utils/cn";
import { Button } from "./button";
import { releaseBackgroundFocus } from "./modal-focus";

const Sheet: Component<SheetPrimitive.DialogRootProps> = (props) => {
  const [local, others] = splitProps(props, ["onOpenChange"]);
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

const SheetTrigger = <T extends ValidComponent = "button">(props: SheetTriggerProps<T>) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
};

type SheetCloseProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogCloseButtonProps<T>
>;

const SheetClose = <T extends ValidComponent = "button">(props: SheetCloseProps<T>) => {
  const [local, others] = splitProps(props as SheetCloseProps, ["aria-label", "children"]);
  const label = () => local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);
  return (
    <SheetPrimitive.CloseButton data-slot="sheet-close" aria-label={label()} {...others}>
      {local.children}
    </SheetPrimitive.CloseButton>
  );
};

const SheetPortal = (props: SheetPrimitive.DialogPortalProps) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
};

type SheetOverlayProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  SheetPrimitive.DialogOverlayProps<T>
> &
  Pick<ComponentProps<T>, "class">;

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
