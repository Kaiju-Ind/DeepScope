import type { PolymorphicProps } from "@kobalte/core";
import {
  Content,
  List,
  Root,
  type TabsContentProps as TabsContentPrimitiveProps,
  type TabsListProps as TabsListPrimitiveProps,
  type TabsRootProps,
  type TabsTriggerProps as TabsTriggerPrimitiveProps,
  Trigger,
} from "@kobalte/core/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { cn } from "@/utils/cn";

type TabsProps<T extends ValidComponent = "div"> = PolymorphicProps<T, TabsRootProps<T>> &
  Pick<ComponentProps<T>, "class" | "children">;

const Tabs = <T extends ValidComponent = "div">(props: TabsProps<T>) => {
  const mergedProps = mergeProps({ orientation: "horizontal" }, props);
  const [local, others] = splitProps(mergedProps, ["class", "orientation"]);
  return (
    <Root
      data-slot="tabs"
      data-orientation={local.orientation}
      orientation={local.orientation}
      class={cn("group/tabs z-tabs flex data-[orientation=horizontal]:flex-col", local.class)}
      {...others}
    />
  );
};

const tabsListVariants = cva(
  "group/tabs-list z-tabs-list inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col",
  {
    variants: {
      variant: {
        default: "z-tabs-list-variant-default",
        line: "z-tabs-list-variant-line gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TabsListProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsListPrimitiveProps<T>
> &
  VariantProps<typeof tabsListVariants> &
  Pick<ComponentProps<T>, "class" | "children">;

const TabsList = <T extends ValidComponent = "div">(props: TabsListProps<T>) => {
  const [local, others] = splitProps(props as TabsListProps, ["variant", "class"]);
  return (
    <List
      class={cn(tabsListVariants({ variant: local.variant }), local.class)}
      data-slot="tabs-list"
      data-variant={local.variant}
      {...others}
    />
  );
};

type TabTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  TabsTriggerPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const TabsTrigger = <T extends ValidComponent = "button">(props: TabTriggerProps<T>) => {
  const [local, others] = splitProps(props as TabTriggerProps, ["class"]);
  return (
    <Trigger
      data-slot="tabs-trigger"
      class={cn(
        "relative z-tabs-trigger inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

type TabsContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  TabsContentPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const TabsContent = <T extends ValidComponent = "div">(props: TabsContentProps<T>) => {
  const [local, others] = splitProps(props as TabsContentProps, ["class"]);
  return (
    <Content
      data-slot="tabs-content"
      class={cn("z-tabs-content flex-1 outline-hidden", local.class)}
      {...others}
    />
  );
};

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListVariants };
