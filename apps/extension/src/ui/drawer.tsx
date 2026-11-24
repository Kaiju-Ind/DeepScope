import {
  Close,
  type CloseProps,
  Content,
  type ContentProps,
  Description,
  type DescriptionProps,
  type DynamicProps,
  Label,
  type LabelProps,
  Overlay,
  type OverlayProps,
  Portal,
  Root,
  type RootProps,
  Trigger,
  type TriggerProps,
  useContext,
} from "@corvu/drawer";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "@/utils/cn";
import { releaseBackgroundFocus } from "@/ui/modal-focus";

type DrawerRootProps<T extends ValidComponent = "div"> = DynamicProps<T, RootProps>;

const DrawerRoot = <T extends ValidComponent = "div">(props: DrawerRootProps<T>) => {
  const [local, others] = splitProps(props as DrawerRootProps, ["onOpenChange"]);
  const onOpenChange = (open: boolean) => {
    releaseBackgroundFocus(open);
    local.onOpenChange?.(open);
  };

  return <Root data-slot="drawer" {...(others as RootProps)} onOpenChange={onOpenChange} />;
};

type DrawerTriggerProps<T extends ValidComponent = "button"> = DynamicProps<T, TriggerProps>;

const DrawerTrigger = <T extends ValidComponent = "button">(props: DrawerTriggerProps<T>) => {
  return <Trigger data-slot="drawer-trigger" {...(props as TriggerProps)} />;
};

type DrawerCloseProps<T extends ValidComponent = "button"> = DynamicProps<T, CloseProps>;

const DrawerClose = <T extends ValidComponent = "button">(props: DrawerCloseProps<T>) => {
  const [local, others] = splitProps(props as DrawerCloseProps, ["aria-label", "children"]);
  const label = () =>
    local["aria-label"] ?? (typeof local.children === "string" ? local.children : undefined);

  return (
    <Close data-slot="drawer-close" aria-label={label()} {...(others as CloseProps)}>
      {local.children}
    </Close>
  );
};

type DrawerOverlayProps<T extends ValidComponent = "div"> = DynamicProps<T, OverlayProps> &
  Pick<ComponentProps<T>, "class">;

const DrawerOverlay = <T extends ValidComponent = "div">(props: DrawerOverlayProps<T>) => {
  const [local, others] = splitProps(props as DrawerOverlayProps, ["class"]);
  const context = useContext();
  return (
    <Overlay
      data-slot="drawer-overlay"
      class={cn("fixed inset-0 z-50 z-drawer-overlay", local.class)}
      {...others}
      style={{
        "background-color": `rgb(0 0 0 / ${0.1 * context.openPercentage()})`,
        "backdrop-filter": `blur(${4 * context.openPercentage()}px)`,
      }}
    />
  );
};

type DrawerContentProps<T extends ValidComponent = "div"> = DynamicProps<T, ContentProps> &
  Pick<ComponentProps<T>, "class" | "children">;

const DrawerContent = <T extends ValidComponent = "div">(props: DrawerContentProps<T>) => {
  const [local, others] = splitProps(props as DrawerContentProps, ["class", "children"]);
  return (
    <Portal data-slot="drawer-portal">
      <DrawerOverlay />
      <Content
        data-slot="drawer-content"
        class={cn(
          "group/drawer-content fixed z-50 z-drawer-content flex max-h-dvh flex-col overflow-y-auto outline-hidden " +
            "data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:max-h-[85dvh] data-[side=bottom]:rounded-t-xl data-[side=bottom]:border-t sm:data-[side=bottom]:rounded-t-4xl " +
            "data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:max-h-[85dvh] data-[side=top]:rounded-b-xl data-[side=top]:border-b sm:data-[side=top]:rounded-b-4xl " +
            "data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-dvh data-[side=right]:w-[min(24rem,calc(100vw-1rem))] data-[side=right]:border-l " +
            "data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-dvh data-[side=left]:w-[min(24rem,calc(100vw-1rem))] data-[side=left]:border-r",
          local.class,
        )}
        {...others}
      >
        <div class="z-drawer-handle mx-auto hidden shrink-0 group-data-[side=bottom]/drawer-content:block" />
        {local.children}
      </Content>
    </Portal>
  );
};

type DrawerHeaderProps = ComponentProps<"div">;

const DrawerHeader = (props: DrawerHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="drawer-header"
      class={cn("z-drawer-header flex flex-col", local.class)}
      {...others}
    />
  );
};

type DrawerFooterProps = ComponentProps<"div">;

const DrawerFooter = (props: DrawerFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="drawer-footer"
      class={cn("z-drawer-footer mt-auto flex flex-col", local.class)}
      {...others}
    />
  );
};

type DrawerLabelProps<T extends ValidComponent = "h2"> = DynamicProps<T, LabelProps> &
  Pick<ComponentProps<T>, "class">;

const DrawerLabel = <T extends ValidComponent = "h2">(props: DrawerLabelProps<T>) => {
  const [local, others] = splitProps(props as DrawerLabelProps, ["class"]);
  return (
    <Label
      data-slot="drawer-title"
      class={cn("z-drawer-title z-font-heading", local.class)}
      {...others}
    />
  );
};

type DrawerDescriptionProps<T extends ValidComponent = "p"> = DynamicProps<T, DescriptionProps> &
  Pick<ComponentProps<T>, "class">;

const DrawerDescription = <T extends ValidComponent = "p">(props: DrawerDescriptionProps<T>) => {
  const [local, others] = splitProps(props as DrawerDescriptionProps, ["class"]);
  return (
    <Description
      data-slot="drawer-description"
      class={cn("z-drawer-description", local.class)}
      {...others}
    />
  );
};

export {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerLabel as DrawerTitle,
  DrawerOverlay,
  DrawerRoot as Drawer,
  DrawerTrigger,
};
