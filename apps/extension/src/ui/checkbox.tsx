import * as CheckboxPrimitive from "@kobalte/core/checkbox";
import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import CheckIcon from "~icons/fluent/checkmark-24-regular";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";

import { cn } from "@/utils/cn";

type CheckboxProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  CheckboxPrimitive.CheckboxRootProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children"> & { rootClass?: ComponentProps<T>["class"] };

const Checkbox = <T extends ValidComponent = "div">(props: CheckboxProps<T>) => {
  const [local, others] = splitProps(props as CheckboxProps, ["class", "rootClass", "id", "children"]);
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      class={cn("group/checkbox inline-flex items-center gap-3 data-disabled:cursor-not-allowed data-disabled:opacity-50", local.rootClass)}
      {...others}
    >
      <CheckboxPrimitive.Input data-slot="checkbox-input" class="peer sr-only" id={local.id} />
      <CheckboxPrimitive.Control
        class={cn(
          "relative z-checkbox shrink-0 outline-hidden after:absolute after:-inset-x-3 after:-inset-y-2",
          local.class,
        )}
      >
        <CheckboxPrimitive.Indicator
          data-slot="checkbox-indicator"
          class="z-checkbox-indicator grid place-content-center text-current transition-none"
        >
          <CheckIcon class="size-3.5" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Control>
      {local.children}
    </CheckboxPrimitive.Root>
  );
};

type CheckboxLabelProps<T extends ValidComponent = "label"> = PolymorphicProps<
  T,
  CheckboxPrimitive.CheckboxLabelProps<T>
> &
  Pick<ComponentProps<T>, "class" | "children">;

const CheckboxLabel = <T extends ValidComponent = "label">(props: CheckboxLabelProps<T>) => {
  const [local, others] = splitProps(props as CheckboxLabelProps, ["class", "children"]);
  return (
    <CheckboxPrimitive.Label
      data-slot="checkbox-label"
      class={cn(
        "z-checkbox-label cursor-pointer text-sm font-medium leading-none data-disabled:cursor-not-allowed data-disabled:opacity-70",
        local.class,
      )}
      {...others}
    >
      {local.children}
    </CheckboxPrimitive.Label>
  );
};

export { Checkbox, CheckboxLabel };
