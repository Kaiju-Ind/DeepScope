import CircleCheck from "~icons/fluent/checkmark-circle-24-regular";
import Info from "~icons/fluent/info-24-regular";
import LoaderCircle from "~icons/fluent/arrow-clockwise-24-regular";
import OctagonX from "~icons/fluent/dismiss-circle-24-regular";
import TriangleAlert from "~icons/fluent/warning-24-regular";
import type { Component, ComponentProps, JSX } from "solid-js";
import { Toaster as Sonner } from "solid-sonner";
import { useColorMode } from "@/ui/components/color-mode";

type ToasterProps = ComponentProps<typeof Sonner>;

const Toaster: Component<ToasterProps> = (props) => {
  const { colorMode } = useColorMode();
  return (
    <Sonner
      theme={colorMode()}
      class="toaster group"
      position="top-center"
      icons={{
        success: <CircleCheck class="size-4" />,
        info: <Info class="size-4" />,
        warning: <TriangleAlert class="size-4" />,
        error: <OctagonX class="size-4" />,
        loading: <LoaderCircle class="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "var(--color-kaiju-navy)",
          "--normal-text": "white",
          "--normal-border": "rgb(255 255 255 / 0.12)",
          "--border-radius": "1rem",
        } as JSX.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
