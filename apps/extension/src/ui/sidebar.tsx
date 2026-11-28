import type { PolymorphicProps } from "@kobalte/core";
import { Polymorphic } from "@kobalte/core";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import Menu from "~icons/fluent/navigation-24-regular";
import type { Accessor, Component, ComponentProps, JSX, ValidComponent } from "solid-js";
import {
  createContext,
  createEffect,
  createSignal,
  Match,
  mergeProps,
  onCleanup,
  Show,
  Switch,
  splitProps,
  useContext,
} from "solid-js";
import { cn } from "../utils/cn.ts";
import { useIsMobile } from "../hooks/use-mobile.ts";
import type { ButtonProps } from "./button.tsx";
import { Button } from "./button.tsx";
import { Input } from "./input.tsx";
import { Separator } from "./separator.tsx";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "./sheet.tsx";
import { Skeleton } from "./skeleton.tsx";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip.tsx";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
  state: Accessor<"expanded" | "collapsed">;
  open: Accessor<boolean>;
  setOpen: (open: boolean) => void;
  openMobile: Accessor<boolean>;
  setOpenMobile: (open: boolean) => void;
  isMobile: Accessor<boolean>;
  toggleSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextProps | null>(null);

/** Require the surrounding sidebar owner so responsive controls share desktop and mobile open state. */
function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

type SidebarProviderProps = ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

/** Own separate desktop and mobile open state, expose controlled desktop updates and install the scoped toggle shortcut. */
const SidebarProvider = (props: SidebarProviderProps) => {
  const mergedProps = mergeProps({ defaultOpen: true }, props);
  const [local, others] = splitProps(mergedProps, [
    "defaultOpen",
    "open",
    "onOpenChange",
    "class",
    "style",
    "children",
  ]);

  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = createSignal(false);

  // This is the internal state of the sidebar.
  // We use open and onOpenChange for control from outside the component.
  const [_open, _setOpen] = createSignal(local.defaultOpen);
  /** Prefer the caller's controlled desktop state and otherwise read the provider's internal open signal. */
  const open = () => local.open ?? _open();
  /** Delegate updates to a caller handler when present; otherwise update internal state and persist its current value in the sidebar cookie. */
  const setOpen = (value: boolean | ((value: boolean) => boolean)) => {
    if (local.onOpenChange) {
      return local.onOpenChange?.(typeof value === "function" ? value(open()) : value);
    }
    _setOpen(value);

    // This sets the cookie to keep the sidebar state.
    // biome-ignore lint/suspicious/noDocumentCookie: <waiting for better solution>
    document.cookie = `${SIDEBAR_COOKIE_NAME}=${open()}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
  };

  // Helper to toggle the sidebar.
  const toggleSidebar = () => {
    return isMobile() ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  };

  // Adds a keyboard shortcut to toggle the sidebar.
  createEffect(() => {
    /** Handle the configured sidebar shortcut only with Meta or Control pressed and suppress its default action. */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    onCleanup(() => window.removeEventListener("keydown", handleKeyDown));
  });

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = () => (open() ? "expanded" : "collapsed");

  const contextValue = {
    state,
    open,
    setOpen,
    isMobile,
    openMobile,
    setOpenMobile,
    toggleSidebar,
  };

  return (
    <SidebarContext.Provider value={contextValue}>
      <div
        data-slot="sidebar-wrapper"
        style={{
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...(local.style as JSX.CSSProperties),
        }}
        class={cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-kaiju-navy",
          local.class,
        )}
        {...others}
      >
        {local.children}
      </div>
    </SidebarContext.Provider>
  );
};

type SidebarProps = ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
};

/** Select a fixed, mobile-sheet or desktop collapsible presentation from the shared sidebar state and caller layout props. */
const Sidebar: Component<SidebarProps> = (props) => {
  const mergedProps = mergeProps<SidebarProps[]>(
    {
      side: "left",
      variant: "sidebar",
      collapsible: "offcanvas",
    },
    props,
  );
  const [local, others] = splitProps(mergedProps, [
    "side",
    "variant",
    "collapsible",
    "class",
    "children",
  ]);

  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  return (
    <Switch>
      <Match when={local.collapsible === "none"}>
        <div
          class={cn(
            "flex h-full w-(--sidebar-width) flex-col bg-kaiju-navy text-white",
            local.class,
          )}
          data-slot="sidebar"
          {...others}
        >
          {local.children}
        </div>
      </Match>
      <Match when={isMobile()}>
        <Sheet onOpenChange={setOpenMobile} open={openMobile()} {...others}>
          <SheetContent
            class="w-(--sidebar-width) bg-kaiju-navy p-0 text-white [&>button]:hidden"
            data-mobile="true"
            data-sidebar="sidebar"
            data-slot="sidebar"
            side={local.side}
            style={{
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            }}
          >
            <SheetHeader class="sr-only">
              <SheetTitle>Sidebar</SheetTitle>
              <SheetDescription>Displays the mobile sidebar.</SheetDescription>
            </SheetHeader>
            <div class="flex size-full flex-col">{local.children}</div>
          </SheetContent>
        </Sheet>
      </Match>
      <Match when={!isMobile()}>
        <div
          class="group peer hidden text-white md:block"
          data-state={state()}
          data-collapsible={state() === "collapsed" ? local.collapsible : ""}
          data-variant={local.variant}
          data-side={local.side}
          data-slot="sidebar"
        >
          {/* This is what handles the sidebar gap on desktop */}
          <div
            data-slot="sidebar-gap"
            class={cn(
              "relative z-sidebar-gap w-(--sidebar-width) bg-transparent",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              local.variant === "floating" || local.variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
            )}
          />
          <div
            data-slot="sidebar-container"
            class={cn(
              "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
              local.side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              local.variant === "floating" || local.variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]"
                : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
              local.class,
            )}
            {...others}
          >
            <div
              data-sidebar="sidebar"
              data-slot="sidebar-inner"
              class="z-sidebar-inner flex size-full flex-col"
            >
              {local.children}
            </div>
          </div>
        </div>
      </Match>
    </Switch>
  );
};

type SidebarTriggerProps = ButtonProps;

/** Invoke the caller's click handler before toggling the responsive sidebar owner. */
const SidebarTrigger = (props: SidebarTriggerProps) => {
  const [local, others] = splitProps(props, ["class", "onClick"]);
  const { toggleSidebar } = useSidebar();

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon-sm"
      class={cn("z-sidebar-trigger", local.class)}
      onClick={(event: MouseEvent) => {
        //@ts-expect-error - TODO: Typescript wizardry needed here
        local.onClick?.(event);
        toggleSidebar();
      }}
      {...others}
    >
      <Menu />
      <span class="sr-only">Toggle Sidebar</span>
    </Button>
  );
};

/** Provide a pointer toggle rail outside the tab order while retaining the labeled sidebar action. */
const SidebarRail = (props: ComponentProps<"button">) => {
  const [local, others] = splitProps(props, ["class"]);
  const { toggleSidebar } = useSidebar();

  return (
    <button
      type="button"
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      class={cn(
        "absolute inset-y-0 z-20 z-sidebar-rail hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 hover:group-data-[collapsible=offcanvas]:bg-kaiju-navy group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        local.class,
      )}
      {...others}
    />
  );
};

/** Expose the content beside the sidebar as the page's main region with shared inset layout. */
const SidebarInset = (props: ComponentProps<"main">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <main
      data-slot="sidebar-inset"
      class={cn("relative z-sidebar-inset flex w-full flex-1 flex-col", local.class)}
      {...others}
    />
  );
};

/** Apply sidebar input styling while retaining the shared Input's native value, ref and event contract. */
const SidebarInput = (props: ComponentProps<typeof Input>) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      class={cn("z-sidebar-input", local.class)}
      {...others}
    />
  );
};

/** Keep header content outside the flexible scrolling body without owning its controls. */
const SidebarHeader = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      class={cn("z-sidebar-header flex shrink-0 flex-col", local.class)}
      {...others}
    />
  );
};

/** Keep footer content outside the flexible scrolling body without owning its controls. */
const SidebarFooter = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      class={cn("z-sidebar-footer flex shrink-0 flex-col", local.class)}
      {...others}
    />
  );
};

type SidebarSeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<
  T,
  ComponentProps<typeof Separator<T>>
>;

/** Style a separator within sidebar spacing while forwarding the shared separator's semantics. */
const SidebarSeparator = <T extends ValidComponent = "hr">(props: SidebarSeparatorProps<T>) => {
  const [local, others] = splitProps(props as SidebarSeparatorProps, ["class"]);
  return (
    <Separator
      data-slot="sidebar-separator"
      data-sidebar="separator"
      class={cn("z-sidebar-separator w-auto", local.class)}
      {...others}
    />
  );
};

/** Own the flexible scrollable body and hide overflow when the sidebar collapses to icons. */
const SidebarContent = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      class={cn(
        "z-sidebar-content flex min-h-0 flex-1 flex-col overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        local.class,
      )}
      {...others}
    />
  );
};

/** Group a section of sidebar content without introducing a new navigation or selection owner. */
const SidebarGroup = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      class={cn("relative z-sidebar-group flex w-full min-w-0 flex-col", local.class)}
      {...others}
    />
  );
};

type SidebarGroupLabelProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ComponentProps<T>
>;

/** Style a polymorphic group heading while leaving its semantic element and accessible name explicit at the call site. */
const SidebarGroupLabel = <T extends ValidComponent = "div">(props: SidebarGroupLabelProps<T>) => {
  const [local, others] = splitProps(props as SidebarGroupLabelProps, ["class"]);

  return (
    <Polymorphic<SidebarGroupLabelProps>
      as="div"
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      class={cn(
        "z-sidebar-group-label flex shrink-0 items-center outline-hidden [&>svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

type SidebarGroupActionProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  ComponentProps<T>
>;

/** Provide a group action with a larger pointer area and hide it in icon-only mode. */
const SidebarGroupAction = <T extends ValidComponent = "button">(
  props: SidebarGroupActionProps<T>,
) => {
  const [local, others] = splitProps(props as SidebarGroupActionProps, ["class"]);
  return (
    <Polymorphic<SidebarGroupActionProps>
      as="button"
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      class={cn(
        "z-sidebar-group-action flex aspect-square items-center justify-center outline-hidden transition-transform after:absolute after:-inset-2 group-data-[collapsible=icon]:hidden md:after:hidden [&>svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

/** Apply section content styling while preserving caller-owned navigation items and controls. */
const SidebarGroupContent = (props: ComponentProps<"div">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      class={cn("z-sidebar-group-content w-full", local.class)}
      {...others}
    />
  );
};

/** Arrange sidebar navigation entries as a native list without deriving routes or active state. */
const SidebarMenu = (props: ComponentProps<"ul">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      class={cn("z-sidebar-menu flex w-full min-w-0 flex-col", local.class)}
      {...others}
    />
  );
};

/** Provide the list item context used by descendant hover and focus styles. */
const SidebarMenuItem = (props: ComponentProps<"li">) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      class={cn("group/menu-item relative", local.class)}
      {...others}
    />
  );
};

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group/menu-button z-sidebar-menu-button flex w-full items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "z-sidebar-menu-button-variant-default",
        outline: "z-sidebar-menu-button-variant-outline",
      },
      size: {
        default: "z-sidebar-menu-button-size-default",
        sm: "z-sidebar-menu-button-size-sm",
        lg: "z-sidebar-menu-button-size-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type SidebarMenuButtonProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  Pick<ComponentProps<T>, "class" | "children">
> &
  VariantProps<typeof sidebarMenuButtonVariants> & {
    isActive?: boolean;
    tooltip?: string;
  };

/** Style caller-selected active state and show an optional tooltip only for a collapsed desktop sidebar. */
const SidebarMenuButton = <T extends ValidComponent = "button">(
  rawProps: SidebarMenuButtonProps<T>,
) => {
  const props = mergeProps({ isActive: false, variant: "default", size: "default" }, rawProps);
  const [local, others] = splitProps(props as SidebarMenuButtonProps, [
    "isActive",
    "tooltip",
    "variant",
    "size",
    "class",
  ]);
  const { isMobile, state } = useSidebar();

  /** Merge tooltip-trigger props with the caller's menu-button props while retaining the surrounding item's size and active appearance. */
  const MenuButton = (props: SidebarMenuButtonProps) => {
    const [_local, _others] = splitProps(props as SidebarMenuButtonProps, ["class"]);
    return (
      <Polymorphic<SidebarMenuButtonProps>
        as="button"
        data-slot="sidebar-menu-button"
        data-sidebar="menu-button"
        data-size={local.size}
        data-active={local.isActive}
        class={cn(
          sidebarMenuButtonVariants({ variant: local.variant, size: local.size }),
          _local.class,
          local.class,
        )}
        {..._others}
        {...others}
      />
    );
  };

  return (
    <Show fallback={<MenuButton />} when={local.tooltip}>
      <Tooltip placement="right">
        <TooltipTrigger as={MenuButton} class="w-full" />
        <TooltipContent hidden={state() !== "collapsed" || isMobile()}>
          {local.tooltip}
        </TooltipContent>
      </Tooltip>
    </Show>
  );
};

type SidebarMenuActionProps<T extends ValidComponent = "button"> = ComponentProps<T> & {
  showOnHover?: boolean;
};

/** Place a secondary item action, optionally revealing it on hover or focus while hiding it in icon-only mode. */
const SidebarMenuAction = <T extends ValidComponent = "button">(
  rawProps: PolymorphicProps<T, SidebarMenuActionProps<T>>,
) => {
  const props = mergeProps({ showOnHover: false }, rawProps);
  const [local, others] = splitProps(props as SidebarMenuActionProps, ["class", "showOnHover"]);

  return (
    <Polymorphic<SidebarMenuActionProps>
      as="button"
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      class={cn(
        "z-sidebar-menu-action flex items-center justify-center outline-hidden transition-transform after:absolute after:-inset-2 group-data-[collapsible=icon]:hidden md:after:hidden [&>svg]:shrink-0",
        local.showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-open:opacity-100 peer-data-active/menu-button:text-kaiju-cyan md:opacity-0",
        local.class,
      )}
      {...others}
    />
  );
};

/** Display a caller-owned count or status and hide it when the sidebar collapses to icons. */
const SidebarMenuBadge: Component<ComponentProps<"div">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      class={cn(
        "z-sidebar-menu-badge flex select-none items-center justify-center tabular-nums group-data-[collapsible=icon]:hidden",
        local.class,
      )}
      {...others}
    />
  );
};

/** Configures the deterministic placeholder rendered for a pending sidebar row. */
type SidebarMenuSkeletonProps = ComponentProps<"div"> & {
  /** Whether the placeholder includes the leading icon shape. */
  showIcon?: boolean;
  /** CSS width used by the text placeholder; defaults to a stable 72%. */
  width?: string;
};

/** Use a deterministic 72-percent text placeholder by default and include an icon placeholder only when requested. */
const SidebarMenuSkeleton: Component<SidebarMenuSkeletonProps> = (rawProps) => {
  const props = mergeProps({ showIcon: false, width: "72%" }, rawProps);
  const [local, others] = splitProps(props, ["class", "showIcon", "width"]);

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      class={cn("z-sidebar-menu-skeleton flex items-center", local.class)}
      {...others}
    >
      <Show when={local.showIcon}>
        <Skeleton class="z-sidebar-menu-skeleton-icon" data-sidebar="menu-skeleton-icon" />
      </Show>
      <Skeleton
        class="z-sidebar-menu-skeleton-text max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={{
          "--skeleton-width": local.width,
        }}
      />
    </div>
  );
};

/** Arrange nested sidebar links in a native list without adding independent selection state. */
const SidebarMenuSub: Component<ComponentProps<"ul">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      class={cn("z-sidebar-menu-sub flex min-w-0 flex-col", local.class)}
      {...others}
    />
  );
};

/** Provide native list item semantics and a styling context for one nested entry. */
const SidebarMenuSubItem: Component<ComponentProps<"li">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      class={cn("group/menu-sub-item relative", local.class)}
      {...others}
    />
  );
};

type SidebarMenuSubButtonProps<T extends ValidComponent = "a"> = ComponentProps<T> & {
  size?: "sm" | "md";
  isActive?: boolean;
};

/** Default a nested entry to a medium link and hide it in icon-only mode; destinations and active state remain caller-owned. */
const SidebarMenuSubButton = <T extends ValidComponent = "a">(
  rawProps: PolymorphicProps<T, SidebarMenuSubButtonProps<T>>,
) => {
  const props = mergeProps({ size: "md" }, rawProps);
  const [local, others] = splitProps(props as SidebarMenuSubButtonProps, [
    "size",
    "isActive",
    "class",
  ]);

  return (
    <Polymorphic<SidebarMenuSubButtonProps>
      as="a"
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={local.size}
      data-active={local.isActive}
      class={cn(
        "z-sidebar-menu-sub-button flex min-w-0 -translate-x-px items-center overflow-hidden outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:hidden [&>span:last-child]:truncate [&>svg]:shrink-0",
        local.class,
      )}
      {...others}
    />
  );
};

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  type SidebarProps,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
