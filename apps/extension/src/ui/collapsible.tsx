import * as CollapsiblePrimitive from "@kobalte/core/collapsible";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

import { cn } from "@/utils/cn";

type CollapsibleProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleRootProps<T>
>;

const Collapsible = <T extends ValidComponent = "div">(props: CollapsibleProps<T>) => {
  return <CollapsiblePrimitive.Root data-slot="collapsible" {...props} />;
};

type CollapsibleTriggerProps<T extends ValidComponent = "button"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleTriggerProps<T>
>;

const CollapsibleTrigger = <T extends ValidComponent = "button">(
  props: CollapsibleTriggerProps<T>,
) => {
  return <CollapsiblePrimitive.Trigger data-slot="collapsible-trigger" {...props} />;
};

type CollapsibleContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CollapsiblePrimitive.CollapsibleContentProps<T>
> &
  Pick<ComponentProps<T>, "class">;

const CollapsibleContent = <T extends ValidComponent = "div">(
  props: CollapsibleContentProps<T>,
) => {
  const [local, others] = splitProps(props as CollapsibleContentProps, ["class"]);
  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      class={cn("z-collapsible-content overflow-hidden", local.class)}
      {...others}
    />
  );
};

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
