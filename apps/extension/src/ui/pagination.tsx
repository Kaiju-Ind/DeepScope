import ChevronLeft from "~icons/fluent/chevron-left-24-regular";
import ChevronRight from "~icons/fluent/chevron-right-24-regular";
import Ellipsis from "~icons/fluent/more-horizontal-24-regular";
import type { ComponentProps } from "solid-js";
import { mergeProps, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";
import { Button, type ButtonProps } from "./button.tsx";

type PaginationProps = ComponentProps<"nav">;

/** Provide a labeled navigation region while leaving page calculation and destinations with the caller. */
const Pagination = (props: PaginationProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <nav
      aria-label="pagination"
      data-slot="pagination"
      class={cn("z-pagination mx-auto flex w-full justify-center", local.class)}
      {...others}
    />
  );
};

type PaginationContentProps = ComponentProps<"ul">;

/** Arrange page controls in a native list without deriving the visible page range. */
const PaginationContent = (props: PaginationContentProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <ul
      data-slot="pagination-content"
      class={cn("z-pagination-content flex items-center", local.class)}
      {...others}
    />
  );
};

type PaginationItemProps = ComponentProps<"li">;

/** Keep each pagination control inside a native list item. */
const PaginationItem = (props: PaginationItemProps) => {
  return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  ComponentProps<"a">;

/** Render a button-styled link and mark the caller-selected page with aria-current. */
const PaginationLink = (props: PaginationLinkProps) => {
  const mergedProps = mergeProps({ size: "icon" } as PaginationLinkProps, props);
  const [local, others] = splitProps(mergedProps, ["class", "isActive", "size"]);
  return (
    <Button
      as="a"
      variant={local.isActive ? "outline" : "ghost"}
      size={local.size}
      class={cn("z-pagination-link", local.class)}
      aria-current={local.isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={local.isActive}
      {...others}
    />
  );
};

type PaginationPreviousProps = ComponentProps<typeof PaginationLink>;

/** Provide the previous-page label and icon; the caller supplies its destination and availability. */
const PaginationPrevious = (props: PaginationPreviousProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      class={cn("z-pagination-previous", local.class)}
      {...others}
    >
      <ChevronLeft data-icon="inline-start" />
      <span class="z-pagination-previous-text hidden sm:block">Previous</span>
    </PaginationLink>
  );
};

type PaginationNextProps = ComponentProps<typeof PaginationLink>;

/** Provide the next-page label and icon; the caller supplies its destination and availability. */
const PaginationNext = (props: PaginationNextProps) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      class={cn("z-pagination-next", local.class)}
      {...others}
    >
      <span class="z-pagination-next-text hidden sm:block">Next</span>
      <ChevronRight data-icon="inline-end" />
    </PaginationLink>
  );
};

type PaginationEllipsisProps = ComponentProps<"span">;

/** Show a decorative omitted-page marker without creating an interactive page control. */
const PaginationEllipsis = (props: PaginationEllipsisProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      class={cn("z-pagination-ellipsis flex items-center justify-center", local.class)}
      {...others}
    >
      <Ellipsis />
      <span class="sr-only">More pages</span>
    </span>
  );
};

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
};
