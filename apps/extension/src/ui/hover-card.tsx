import * as HoverCardPrimitive from "@kobalte/core/hover-card";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import type { ComponentProps, ValidComponent } from "solid-js";
import { mergeProps, splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";

/** Default the hover-card gutter to four pixels while retaining primitive hover timing and open state. */
const HoverCard = (props: HoverCardPrimitive.HoverCardRootProps) => {
  const mergedProps = mergeProps({ gutter: 4 }, props);
  return <HoverCardPrimitive.Root data-slot="hover-card" {...mergedProps} />;
};

type HoverCardTriggerProps<T extends ValidComponent = "a"> = PolymorphicProps<
  T,
  HoverCardPrimitive.HoverCardTriggerProps<T>
>;

/** Connect caller content to the primitive's hover and focus activation behavior. */
const HoverCardTrigger = <T extends ValidComponent = "a">(props: HoverCardTriggerProps<T>) => (
  <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
);

type HoverCardContentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  HoverCardPrimitive.HoverCardContentProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Portal the hover surface while preserving primitive positioning and its trigger-to-content lifetime. */
const HoverCardContent = <T extends ValidComponent = "div">(props: HoverCardContentProps<T>) => {
  const [local, others] = splitProps(props as HoverCardContentProps, ["class", "children"]);
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        class={cn(
          "z-50 z-hover-card-content origin-(--kb-hovercard-content-transform-origin) outline-hidden",
          local.class,
        )}
        {...others}
      >
        {local.children}
      </HoverCardPrimitive.Content>
    </HoverCardPrimitive.Portal>
  );
};

export { HoverCard, HoverCardContent, HoverCardTrigger };
