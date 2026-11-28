import * as MenubarPrimitive from "@kobalte/core/menubar";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import Check from "~icons/fluent/checkmark-24-regular";
import ChevronRight from "~icons/fluent/chevron-right-24-regular";
import type { Component, ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { releaseBackgroundFocus } from "./modal-focus.ts";

type MenubarProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Arrange top-level menu triggers while the primitive owns roving focus and menu navigation. */
const Menubar = <T extends ValidComponent = "div">(props: MenubarProps<T>) => {
  const [local, others] = splitProps(props as MenubarProps, ["class"]);
  return (
    <MenubarPrimitive.Root
      data-slot="menubar"
      class={cn("z-menubar flex items-center", local.class)}
      {...others}
    />
  );
};

/** Default the menu gutter to eight pixels and apply shared background-focus policy before caller open notifications. */
const MenubarMenu = (props: MenubarPrimitive.MenubarMenuProps) => {
  const mergedProps = mergeProps({ gutter: 8 }, props);
  const [local, others] = splitProps(mergedProps, ["onOpenChange"]);
  /** Release background focus when a menubar menu opens, then notify the caller of the same state change. */
  const onOpenChange = (open: boolean) => {
    releaseBackgroundFocus(open);
    local.onOpenChange?.(open);
  };

  return <MenubarPrimitive.Menu data-slot="menubar-menu" {...others} onOpenChange={onOpenChange} />;
};

type MenubarTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Style a top-level trigger without replacing the menubar primitive's keyboard or open-state behavior. */
const MenubarTrigger = <T extends ValidComponent = "button">(props: MenubarTriggerProps<T>) => {
  const [local, others] = splitProps(props as MenubarTriggerProps, ["class", "children"]);
  return (
    <MenubarPrimitive.Trigger
      data-slot="menubar-trigger"
      class={cn("z-menubar-trigger flex select-none items-center outline-hidden", local.class)}
      {...others}
    >
      {local.children}
    </MenubarPrimitive.Trigger>
  );
};

/** Delegate menu content placement and presence to the primitive's portal. */
const MenubarPortal: Component<MenubarPrimitive.MenubarPortalProps> = (props) => {
  return <MenubarPrimitive.Portal data-slot="menubar-portal" {...props} />;
};

type MenubarContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarContentProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Portal the menu surface while retaining primitive focus, dismissal and position handling. */
const MenubarContent = <T extends ValidComponent = "div">(props: MenubarContentProps<T>) => {
  const [local, others] = splitProps(props as MenubarContentProps, ["class"]);
  return (
    <MenubarPortal>
      <MenubarPrimitive.Content
        data-slot="menubar-content"
        class={cn("z-50 z-menu-target z-menubar-content min-w-48 overflow-hidden", local.class)}
        {...others}
      />
    </MenubarPortal>
  );
};

type MenubarGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Group related menu items with primitive semantics and local presentation. */
const MenubarGroup = <T extends ValidComponent = "div">(props: MenubarGroupProps<T>) => {
  const [local, others] = splitProps(props as MenubarGroupProps, ["class"]);
  return (
    <MenubarPrimitive.Group
      data-slot="menubar-group"
      class={cn("z-menubar-group", local.class)}
      {...others}
    />
  );
};

type MenubarItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarItemProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean;
    variant?: "default" | "destructive";
  };

/** Use standard, non-inset item defaults while forwarding action handlers and disabled state. */
const MenubarItem = <T extends ValidComponent = "div">(props: MenubarItemProps<T>) => {
  const mergedProps = mergeProps(
    { variant: "default", inset: false } as MenubarItemProps<T>,
    props,
  );
  const [local, others] = splitProps(mergedProps as MenubarItemProps, [
    "class",
    "inset",
    "variant",
  ]);
  return (
    <MenubarPrimitive.Item
      data-slot="menubar-item"
      data-inset={local.inset || undefined}
      data-variant={local.variant}
      class={cn(
        "group/menubar-item relative z-menubar-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

type MenubarCheckboxItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarCheckboxItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Display a check indicator from primitive state while the caller owns the underlying setting. */
const MenubarCheckboxItem = <T extends ValidComponent = "div">(
  props: MenubarCheckboxItemProps<T>,
) => {
  const [local, others] = splitProps(props as MenubarCheckboxItemProps, ["class", "children"]);
  return (
    <MenubarPrimitive.CheckboxItem
      data-slot="menubar-checkbox-item"
      class={cn(
        "relative z-menubar-checkbox-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      <span class="pointer-events-none absolute z-menubar-checkbox-item-indicator flex items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.CheckboxItem>
  );
};

type MenubarRadioGroupProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioGroupProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Forward a mutually exclusive menu selection to the primitive's radio-group owner. */
const MenubarRadioGroup = <T extends ValidComponent = "div">(props: MenubarRadioGroupProps<T>) => {
  const [local, others] = splitProps(props as MenubarRadioGroupProps, ["class"]);
  return (
    <MenubarPrimitive.RadioGroup
      data-slot="menubar-radio-group"
      class={cn("z-menubar-radio-group", local.class)}
      {...others}
    />
  );
};

type MenubarRadioItemProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarRadioItemProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Show primitive selection for one caller-supplied radio value without duplicating group state. */
const MenubarRadioItem = <T extends ValidComponent = "div">(props: MenubarRadioItemProps<T>) => {
  const [local, others] = splitProps(props as MenubarRadioItemProps, ["class", "children"]);
  return (
    <MenubarPrimitive.RadioItem
      data-slot="menubar-radio-item"
      class={cn(
        "relative z-menubar-radio-item flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      <span class="pointer-events-none absolute z-menubar-radio-item-indicator flex items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {local.children}
    </MenubarPrimitive.RadioItem>
  );
};

type MenubarGroupLabelProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarGroupLabelProps<T>
> &
  Pick<ComponentProps<T>, "class"> & {
    inset?: boolean;
  };

/** Associate a group label with optional inset alignment, which is disabled by default. */
const MenubarLabel = <T extends ValidComponent = "span">(props: MenubarGroupLabelProps<T>) => {
  const mergedProps = mergeProps({ inset: false } as MenubarGroupLabelProps<T>, props);
  const [local, others] = splitProps(mergedProps as MenubarGroupLabelProps, ["class", "inset"]);
  return (
    <MenubarPrimitive.GroupLabel
      data-slot="menubar-label"
      data-inset={local.inset || undefined}
      class={cn("z-menubar-label", local.class)}
      {...others}
    />
  );
};

type MenubarSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSeparatorProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Visually divide item groups without introducing an interactive menu item. */
const MenubarSeparator = <T extends ValidComponent = "hr">(props: MenubarSeparatorProps<T>) => {
  const [local, others] = splitProps(props as MenubarSeparatorProps, ["class"]);
  return (
    <MenubarPrimitive.Separator
      data-slot="menubar-separator"
      class={cn("z-menubar-separator -mx-1 my-1 h-px", local.class)}
      {...others}
    />
  );
};

type MenubarShortcutProps = ComponentProps<"span">;

/** Align a displayed shortcut hint after item content; keyboard registration remains external. */
const MenubarShortcut = (props: MenubarShortcutProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="menubar-shortcut"
      class={cn("z-menubar-shortcut ml-auto", local.class)}
      {...others}
    />
  );
};

/** Attach nested-menu state to the current menubar menu hierarchy. */
const MenubarSub: Component<MenubarPrimitive.MenubarSubProps> = (props) => {
  return <MenubarPrimitive.Sub data-slot="menubar-sub" {...props} />;
};

type MenubarSubTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubTriggerProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    inset?: boolean;
  };

/** Style the submenu trigger and direction indicator while retaining primitive nested-menu navigation. */
const MenubarSubTrigger = <T extends ValidComponent = "div">(props: MenubarSubTriggerProps<T>) => {
  const mergedProps = mergeProps({ inset: false } as MenubarSubTriggerProps<T>, props);
  const [local, others] = splitProps(mergedProps as MenubarSubTriggerProps, [
    "class",
    "inset",
    "children",
  ]);
  return (
    <MenubarPrimitive.SubTrigger
      data-slot="menubar-sub-trigger"
      data-inset={local.inset || undefined}
      class={cn(
        "z-menubar-sub-trigger flex cursor-default select-none items-center outline-hidden data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <ChevronRight class="ml-auto" />
    </MenubarPrimitive.SubTrigger>
  );
};

type MenubarSubContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  MenubarPrimitive.MenubarSubContentProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Portal nested content while preserving the submenu primitive's focus and open lifecycle. */
const MenubarSubContent = <T extends ValidComponent = "div">(props: MenubarSubContentProps<T>) => {
  const [local, others] = splitProps(props as MenubarSubContentProps, ["class"]);
  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.SubContent
        data-slot="menubar-sub-content"
        class={cn("z-50 z-menubar-sub-content min-w-32 overflow-hidden", local.class)}
        {...others}
      />
    </MenubarPrimitive.Portal>
  );
};

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
