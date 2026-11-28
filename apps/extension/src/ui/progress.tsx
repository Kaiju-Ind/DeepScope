import type { PolymorphicProps } from "@kobalte/core/polymorphic";
import {
  Fill,
  Label,
  type ProgressFillProps,
  type ProgressLabelProps,
  type ProgressRootProps,
  type ProgressTrackProps,
  type ProgressValueLabelProps,
  Root,
  Track,
  ValueLabel,
} from "@kobalte/core/progress";
import { type ComponentProps, splitProps, type ValidComponent } from "solid-js";
import { cn } from "../utils/cn.ts";

type ProgressProps<T extends ValidComponent = "div"> = PolymorphicProps<T, ProgressRootProps<T>> &
  Pick<ComponentProps<T>, "class" | "children">;

/** Compose optional labels with the default track and indicator while leaving progress value and range with the primitive. */
const Progress = <T extends ValidComponent = "div">(props: ProgressProps<T>) => {
  const [local, others] = splitProps(props as ProgressProps, ["class", "children"]);
  return (
    <Root
      data-slot="progress"
      class={cn("z-progress-root flex flex-wrap gap-3", local.class)}
      {...others}
    >
      {local.children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </Root>
  );
};

type ProgressTrackComponentProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressTrackProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Provide the visual progress track without deriving or changing the current progress value. */
const ProgressTrack = <T extends ValidComponent = "div">(props: ProgressTrackComponentProps<T>) => {
  const [local, others] = splitProps(props as ProgressTrackComponentProps, ["class"]);
  return (
    <Track
      data-slot="progress-track"
      class={cn(
        "relative z-progress-track flex w-full items-center overflow-x-hidden",
        local.class,
      )}
      {...others}
    />
  );
};

type ProgressIndicatorProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressFillProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Use the primitive's computed fill-width variable so visual progress follows its range calculations. */
const ProgressIndicator = <T extends ValidComponent = "div">(props: ProgressIndicatorProps<T>) => {
  const [local, others] = splitProps(props as ProgressIndicatorProps, ["class"]);
  return (
    <Fill
      data-slot="progress-indicator"
      class={cn(
        "z-progress-indicator h-full w-(--kb-progress-fill-width) transition-all",
        local.class,
      )}
      {...others}
    />
  );
};

type ProgressLabelComponentProps<T extends ValidComponent = "span"> = PolymorphicProps<
  T,
  ProgressLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Associate caller-provided label text with the surrounding progress primitive. */
const ProgressLabel = <T extends ValidComponent = "span">(
  props: ProgressLabelComponentProps<T>,
) => {
  const [local, others] = splitProps(props as ProgressLabelComponentProps, ["class"]);
  return (
    <Label data-slot="progress-label" class={cn("z-progress-label", local.class)} {...others} />
  );
};

type ProgressValueProps<T extends ValidComponent = "div"> = PolymorphicProps<
  T,
  ProgressValueLabelProps<T>
> &
  Pick<ComponentProps<T>, "class">;

/** Render the primitive's value label using its current progress context and caller formatting props. */
const ProgressValue = <T extends ValidComponent = "div">(props: ProgressValueProps<T>) => {
  const [local, others] = splitProps(props as ProgressValueProps, ["class"]);
  return (
    <ValueLabel
      data-slot="progress-value"
      class={cn("z-progress-value", local.class)}
      {...others}
    />
  );
};

export { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue };
