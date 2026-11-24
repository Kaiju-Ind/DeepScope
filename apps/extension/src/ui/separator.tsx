import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import { Separator as SeparatorPrimitive, type SeparatorRootProps } from "@kobalte/core/separator";
import { type ComponentProps, mergeProps, splitProps, type ValidComponent } from "solid-js";
import { cn } from "@/utils/cn";

type SeparatorProps<T extends ValidComponent = "hr"> = PolymorphicProps<T, SeparatorRootProps<T>> & {
  class?: string;
};

const Separator = <T extends ValidComponent = "hr">(props: SeparatorProps<T>) => {
  const mergedProps = mergeProps({ orientation: "horizontal" } as const, props);
  const [local, others] = splitProps(mergedProps as SeparatorProps, ["class"]);
  return (
    <SeparatorPrimitive
      data-slot="separator"
      class={cn(
        "z-separator shrink-0 border-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px",
        local.class,
      )}
      {...others}
    />
  );
};

export { Separator, type SeparatorProps };
