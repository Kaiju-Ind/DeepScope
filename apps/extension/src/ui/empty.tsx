import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";

type EmptyProps = ComponentProps<"div">;

/** Center an empty-state composition while leaving the decision to show it with the product view. */
const Empty = (props: EmptyProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty"
      class={cn(
        "z-empty flex w-full min-w-0 flex-1 flex-col items-center justify-center text-balance text-center",
        local.class,
      )}
      {...others}
    />
  );
};

type EmptyHeaderProps = ComponentProps<"div">;

/** Constrain and align the empty state's title, description and media content. */
const EmptyHeader = (props: EmptyHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-header"
      class={cn("z-empty-header flex max-w-sm flex-col items-center", local.class)}
      {...others}
    />
  );
};

const emptyMediaVariants = cva(
  "z-empty-media flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "z-empty-media-default",
        icon: "z-empty-media-icon",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type EmptyMediaProps = ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>;

/** Apply the selected empty-state media treatment without deciding which icon or image to show. */
const EmptyMedia = (props: EmptyMediaProps) => {
  const [local, others] = splitProps(props, ["class", "variant"]);

  return (
    <div
      data-slot="empty-icon"
      data-variant={local.variant}
      class={cn(emptyMediaVariants({ variant: local.variant }), local.class)}
      {...others}
    />
  );
};

type EmptyTitleProps = ComponentProps<"div">;

/** Style the empty-state title slot; the caller owns the message and heading level. */
const EmptyTitle = (props: EmptyTitleProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-title"
      class={cn("z-empty-title z-font-heading", local.class)}
      {...others}
    />
  );
};

type EmptyDescriptionProps = ComponentProps<"p">;

/** Style the explanation of an empty state without introducing behavior or status announcements. */
const EmptyDescription = (props: EmptyDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-description"
      class={cn(
        "z-empty-description",
        local.class,
      )}
      {...others}
    />
  );
};

type EmptyContentProps = ComponentProps<"div">;

/** Constrain follow-up content and actions within the empty-state composition. */
const EmptyContent = (props: EmptyContentProps) => {
  const [local, others] = splitProps(props, ["class"]);

  return (
    <div
      data-slot="empty-content"
      class={cn(
        "z-empty-content flex w-full min-w-0 max-w-sm flex-col items-center text-balance",
        local.class,
      )}
      {...others}
    />
  );
};

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
