import {
  Content,
  Menu,
  type NavigationMenuContentProps as NavigationMenuContentPrimitiveProps,
  type NavigationMenuRootProps,
  type NavigationMenuTriggerProps as NavigationMenuTriggerPrimitiveProps,
  Portal,
  Root,
  Trigger,
  Viewport,
} from "@kobalte/core/navigation-menu";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { cva } from "class-variance-authority";
import ChevronDown from "~icons/fluent/chevron-down-24-regular";
import type { ComponentProps, JSX, ValidComponent } from "solid-js";
import { mergeProps, Show, splitProps } from "solid-js";
import { cn } from "@/utils/cn";

type NavigationMenuProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const NavigationMenu = <T extends ValidComponent = "ul">(props: NavigationMenuProps<T>) => {
  const mergedProps = mergeProps({ gutter: 8, placement: "bottom-start" }, props);
  const [local, others] = splitProps(mergedProps as NavigationMenuProps, ["class", "children"]);
  return (
    <Root
      data-slot="navigation-menu"
      class={cn("group/navigation-menu z-navigation-menu", local.class)}
      {...others}
    >
      <div
        data-slot="navigation-menu-list"
        class="group z-navigation-menu-list flex list-none items-center"
      >
        {local.children}
      </div>
      <Viewport
        data-slot="navigation-menu-viewport"
        class="z-navigation-menu-viewport origin-(--kb-menu-content-transform-origin)"
      />
    </Root>
  );
};

type NavigationMenuItemProps = ComponentProps<"div">;

const NavigationMenuItem = (props: NavigationMenuItemProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Menu>
      <div
        data-slot="navigation-menu-item"
        class={cn("relative z-navigation-menu-item", local.class)}
        {...others}
      />
    </Menu>
  );
};

const navigationMenuTriggerStyle = cva(
  "group/navigation-menu-trigger z-navigation-menu-trigger inline-flex h-9 w-max items-center justify-center outline-hidden disabled:pointer-events-none",
);

type NavigationMenuTriggerProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  NavigationMenuTriggerPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & {
    showIcon?: boolean;
  };

const NavigationMenuTrigger = <T extends ValidComponent = "div">(
  props: NavigationMenuTriggerProps<T>,
) => {
  const mergedProps = mergeProps({ showIcon: true }, props);
  const [local, others] = splitProps(mergedProps as NavigationMenuTriggerProps, [
    "class",
    "children",
    "showIcon",
  ]);
  return (
    <Trigger
      data-slot="navigation-menu-trigger"
      class={cn(navigationMenuTriggerStyle(), "group", local.class)}
      {...others}
    >
      {local.children}
      <Show when={local.showIcon}>
        <ChevronDown class="z-navigation-menu-trigger-icon" aria-hidden="true" />
      </Show>
    </Trigger>
  );
};

type NavigationMenuContentProps<T extends ValidComponent = "ul"> = PolymorphicProps<
  T,
  NavigationMenuContentPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const NavigationMenuContent = <T extends ValidComponent = "ul">(
  props: NavigationMenuContentProps<T>,
) => {
  const [local, others] = splitProps(props as NavigationMenuContentProps, ["class"]);
  return (
    <Portal>
      <Content
        data-slot="navigation-menu-content"
        class={cn(
          "z-navigation-menu-content origin-(--kb-menu-content-transform-origin) **:data-[slot=navigation-menu-link]:focus:outline-hidden **:data-[slot=navigation-menu-link]:focus:ring-0",
          local.class,
        )}
        {...others}
      />
    </Portal>
  );
};

type NavigationMenuLinkProps = ComponentProps<"a"> & {
  class?: string;
  children?: JSX.Element;
};

const NavigationMenuLink = (props: NavigationMenuLinkProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <a
      data-slot="navigation-menu-link"
      class={cn("z-navigation-menu-link", local.class)}
      {...others}
    />
  );
};

type NavigationMenuIndicatorProps = ComponentProps<"div"> & {
  class?: string;
};

const NavigationMenuIndicator = (props: NavigationMenuIndicatorProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="navigation-menu-indicator"
      class={cn(
        "top-full z-1 z-navigation-menu-indicator flex h-1.5 items-end justify-center overflow-hidden",
        local.class,
      )}
      {...others}
    >
      <div class="relative top-[60%] z-navigation-menu-indicator-arrow h-2 w-2 rotate-45" />
    </div>
  );
};

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
};
