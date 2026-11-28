import OtpField, { type RootProps as OtpFieldRootProps } from "@corvu/otp-field";
import Minus from "~icons/fluent/subtract-24-regular";
import { type ComponentProps, Show, splitProps } from "solid-js";

import { cn } from "../utils/cn.ts";

type InputOTPProps = OtpFieldRootProps &
  ComponentProps<"div"> &
  Pick<ComponentProps<"input">, "disabled" | "required"> & {
    containerClass?: string;
  };

/** Keep OTP value ownership on the field root and forward ID, disabled and required semantics to its real input. */
const InputOTP = (props: InputOTPProps) => {
  const [local, others] = splitProps(props as InputOTPProps, [
    "class",
    "containerClass",
    "children",
    "id",
    "disabled",
    "required",
    "value",
    "onValueChange",
  ]);

  return (
    <OtpField
      data-slot="input-otp"
      spellcheck={false}
      class={cn("z-input-otp flex items-center overflow-clip has-disabled:opacity-50", local.containerClass)}
      value={local.value}
      onValueChange={local.onValueChange}
      {...others}
    >
      <OtpField.Input
        id={local.id}
        data-slot="input-otp-input"
        class={cn("z-input-otp-input disabled:cursor-not-allowed", local.class)}
        spellcheck={false}
        disabled={local.disabled}
        required={local.required}
      />
      {local.children}
    </OtpField>
  );
};

type InputOTPGroupProps = ComponentProps<"div">;

/** Arrange visual OTP slots without creating additional native inputs or selection state. */
const InputOTPGroup = (props: InputOTPGroupProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="input-otp-group"
      class={cn("z-input-otp-group flex items-center", local.class)}
      {...others}
    />
  );
};

type InputOTPSlotProps = ComponentProps<"div"> & {
  index: number;
};

/** Render one visual character and caret from the shared OTP field's value and active-slot state. */
const InputOTPSlot = (props: InputOTPSlotProps) => {
  const [local, others] = splitProps(props, ["index", "class"]);
  const context = OtpField.useContext();

  /** Read this slot's character from the shared value using the caller's current slot index. */
  const char = () => context.value()[local.index];
  /** Use the primitive's active-slot set so visual focus follows its selection model. */
  const isActive = () => context.activeSlots().includes(local.index);
  /** Show the visual caret only for an active slot while the primitive is in insertion mode. */
  const showCaret = () => isActive() && context.isInserting();

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive()}
      class={cn(
        "relative z-input-otp-slot flex items-center justify-center data-[active=true]:z-10",
        local.class,
      )}
      {...others}
    >
      {char()}
      <Show when={showCaret()}>
        <div class="pointer-events-none absolute inset-0 z-input-otp-caret flex items-center justify-center">
          <div class="z-input-otp-caret-line h-4 w-px animate-caret-blink" />
        </div>
      </Show>
    </div>
  );
};

type InputOTPSeparatorProps = ComponentProps<"div">;

/** Separate groups of visual slots with a decorative marker hidden from assistive technology. */
const InputOTPSeparator = (props: InputOTPSeparatorProps) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div
      data-slot="input-otp-separator"
      class={cn("z-input-otp-separator flex items-center", local.class)}
      aria-hidden="true"
      {...others}
    >
      <Minus />
    </div>
  );
};

export {
  InputOTP,
  InputOTPGroup,
  type InputOTPGroupProps,
  type InputOTPProps,
  InputOTPSeparator,
  type InputOTPSeparatorProps,
  InputOTPSlot,
  type InputOTPSlotProps,
};
