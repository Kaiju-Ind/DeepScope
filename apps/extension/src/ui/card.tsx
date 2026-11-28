import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";

type CardProps = ComponentProps<"div"> & { size?: "default" | "sm" };

/** Establish the default card size and layout while leaving content and interaction ownership with the caller. */
const Card = (props: CardProps) => {
  const mergedProps = mergeProps({ size: "default" } as const, props);
  const [local, others] = splitProps(mergedProps, ["class", "size"]);
  return (
    <div
      data-slot="card"
      data-size={local.size}
      class={cn("group/card z-card flex flex-col", local.class)}
      {...others}
    />
  );
};

type CardHeaderProps = ComponentProps<"div">;

/** Arrange card title, description and action slots using their presence rather than component state. */
const CardHeader = (props: CardHeaderProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-header"
      class={cn(
        "group/card-header @container/card-header z-card-header grid auto-rows-min items-start has-data-[slot=card-description]:grid-rows-[auto_auto]",
        local.class,
      )}
      {...others}
    />
  );
};

type CardTitleProps = ComponentProps<"div">;

/** Style the card title slot without choosing a heading level for the caller. */
const CardTitle = (props: CardTitleProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-title"
      class={cn("z-card-title z-font-heading", local.class)}
      {...others}
    />
  );
};

type CardDescriptionProps = ComponentProps<"div">;

/** Style supporting card text without changing its supplied content or semantics. */
const CardDescription = (props: CardDescriptionProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="card-description" class={cn("z-card-description", local.class)} {...others} />
  );
};

type CardActionProps = ComponentProps<"div">;

/** Place card actions below or beside the heading according to the header's available width. */
const CardAction = (props: CardActionProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-action"
      class={cn(
        "z-card-action row-start-3 mt-3 justify-self-start @xs/card-header:col-start-2 @xs/card-header:row-span-2 @xs/card-header:row-start-1 @xs/card-header:mt-0 @xs/card-header:self-start @xs/card-header:justify-self-end",
        local.class,
      )}
      {...others}
    />
  );
};

type CardContentProps = ComponentProps<"div">;

/** Apply the card body slot's spacing while forwarding native div props. */
const CardContent = (props: CardContentProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div data-slot="card-content" class={cn("z-card-content", local.class)} {...others} />;
};

type CardFooterProps = ComponentProps<"div">;

/** Arrange caller-owned footer content in a horizontal card slot. */
const CardFooter = (props: CardFooterProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="card-footer"
      class={cn("z-card-footer flex items-center", local.class)}
      {...others}
    />
  );
};

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
