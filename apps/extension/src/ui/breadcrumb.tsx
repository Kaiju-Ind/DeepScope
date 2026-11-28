import {
  type BreadcrumbsLinkProps as BreadcrumbsLinkPrimitiveProps,
  type BreadcrumbsRootProps,
  type BreadcrumbsSeparatorProps as BreadcrumbsSeparatorPrimitiveProps,
  Link,
  Root,
  Separator,
} from "@kobalte/core/breadcrumbs";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import Ellipsis from "~icons/fluent/more-horizontal-24-regular";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

type BreadcrumbProps<T extends ValidComponent = "nav"> = PolymorphicProps<
  T,
  BreadcrumbsRootProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Provide a breadcrumb-labeled navigation root while allowing the caller to supply native navigation attributes. */
const Breadcrumb = <T extends ValidComponent = "nav">(props: BreadcrumbProps<T>) => {
  const [local, others] = splitProps(props as BreadcrumbProps, ["class"]);
  return (
    <Root
      aria-label="breadcrumb"
      class={cn("z-breadcrumb", local.class)}
      data-slot="breadcrumb"
      {...others}
    />
  );
};

type BreadcrumbListProps = ComponentProps<"ol">;

/** Keep breadcrumb items in an ordered, wrapping list without deriving the route hierarchy. */
const BreadcrumbList = (props: BreadcrumbListProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ol
      class={cn("wrap-break-word z-breadcrumb-list flex flex-wrap items-center", local.class)}
      data-slot="breadcrumb-list"
      {...others}
    />
  );
};

type BreadcrumbItemProps = ComponentProps<"li">;

/** Group one breadcrumb link or current-page label in a list item. */
const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <li
      class={cn("z-breadcrumb-item inline-flex items-center", local.class)}
      data-slot="breadcrumb-item"
      {...others}
    />
  );
};

type BreadcrumbLinkProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  BreadcrumbsLinkPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Style a navigable breadcrumb while leaving destination and link behavior with the caller and link primitive. */
const BreadcrumbLink = <T extends ValidComponent = "a">(props: BreadcrumbLinkProps<T>) => {
  const [local, others] = splitProps(props as BreadcrumbLinkProps, ["class"]);
  return (
    <Link class={cn("z-breadcrumb-link", local.class)} data-slot="breadcrumb-link" {...others} />
  );
};

type BreadcrumbPageProps = ComponentProps<"span">;

/** Mark the current breadcrumb as a disabled current-page link label; it does not initiate navigation. */
const BreadcrumbPage = (props: BreadcrumbPageProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    // biome-ignore lint/a11y/useFocusableInteractive: <exception for breadcrumb>
    // biome-ignore lint/a11y/useSemanticElements: <exception for breadcrumb>
    <span
      aria-current="page"
      aria-disabled="true"
      class={cn("z-breadcrumb-page", local.class)}
      data-slot="breadcrumb-page"
      role="link"
      {...others}
    />
  );
};

type BreadcrumbSeparatorProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  BreadcrumbsSeparatorPrimitiveProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Add a decorative breadcrumb separator that is hidden from the accessibility tree by default. */
const BreadcrumbSeparator = <T extends ValidComponent = "span">(
  props: BreadcrumbSeparatorProps<T>,
) => {
  const [local, others] = splitProps(props as BreadcrumbSeparatorProps, ["class"]);
  return (
    <Separator
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      class={cn("z-breadcrumb-separator", local.class)}
      {...others}
    />
  );
};

type BreadcrumbEllipsisProps = ComponentProps<"span">;

/** Show a decorative omitted-path marker without creating a navigation or expansion control. */
const BreadcrumbEllipsis = (props: BreadcrumbEllipsisProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      class={cn("z-breadcrumb-ellipsis flex items-center justify-center", local.class)}
      {...others}
    >
      <Ellipsis />
      <span class="sr-only">More</span>
    </span>
  );
};

export {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
};
