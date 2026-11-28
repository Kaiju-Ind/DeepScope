import { Command as CommandPrimitive } from "cmdk-solid";
import Check from "~icons/fluent/checkmark-24-regular";
import SearchIcon from "~icons/fluent/search-24-regular";
import { type ComponentProps, mergeProps, splitProps } from "solid-js";
import { cn } from "../utils/cn.ts";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog.tsx";
import { InputGroup, InputGroupAddon } from "./input-group.tsx";

/** Provide the command surface while forwarding the caller's props to the existing command primitive. */
function Command(props: ComponentProps<"div">) {
  return (
    <CommandPrimitive
      data-slot="command"
      class={cn("z-command flex size-full flex-col overflow-hidden", props.class)}
      {...props}
    />
  );
}

type CommandDialogProps = ComponentProps<typeof Dialog> &
  Pick<ComponentProps<"div">, "class"> & {
    title?: string;
    description?: string;
    showCloseButton?: boolean;
  };

/** Place command content in a dialog with default accessible title and description and no close button unless requested. */
function CommandDialog(props: CommandDialogProps) {
  const mergedProps = mergeProps(
    {
      title: "Command Palette",
      description: "Search for a command to run...",
      showCloseButton: false,
    },
    props,
  );

  const [local, others] = splitProps(mergedProps as CommandDialogProps, [
    "title",
    "description",
    "showCloseButton",
    "children",
    "class",
  ]);

  return (
    <Dialog {...others}>
      <DialogHeader class="sr-only">
        <DialogTitle>{local.title}</DialogTitle>
        <DialogDescription>{local.description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        class={cn("z-command-dialog overflow-hidden p-0", local.class)}
        showCloseButton={local.showCloseButton}
      >
        {local.children}
      </DialogContent>
    </Dialog>
  );
}

/** Compose a decorative search icon with the primitive's query input; query ownership and filtering stay with the command primitive. */
function CommandInput(props: ComponentProps<typeof CommandPrimitive.Input>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <div data-slot="command-input-wrapper" class="z-command-input-wrapper">
      <InputGroup class="z-command-input-group">
        <InputGroupAddon aria-hidden="true">
          <SearchIcon class="z-command-input-icon" />
        </InputGroupAddon>
        <CommandPrimitive.Input
          data-slot="command-input"
          class={cn(
            "z-command-input outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            local.class,
          )}
          {...others}
        />
      </InputGroup>
    </div>
  );
}

/** Constrain the command results to a scrollable list while preserving primitive item navigation. */
function CommandList(props: ComponentProps<typeof CommandPrimitive.List>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      class={cn("z-command-list overflow-y-auto overflow-x-hidden", local.class)}
      {...others}
    />
  );
}

/** Style the primitive's empty-results presentation without duplicating its filtering state. */
function CommandEmpty(props: ComponentProps<typeof CommandPrimitive.Empty>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Empty
      data-slot="command-empty"
      class={cn("z-command-empty", local.class)}
      {...others}
    />
  );
}

/** Style a command group while leaving its heading and filtered-item membership with the primitive. */
function CommandGroup(props: ComponentProps<typeof CommandPrimitive.Group>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      class={cn("z-command-group", local.class)}
      {...others}
    />
  );
}

/** Divide command groups using the primitive's separator behavior. */
function CommandSeparator(props: ComponentProps<typeof CommandPrimitive.Separator>) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      class={cn("z-command-separator", local.class)}
      {...others}
    />
  );
}

/** Style an actionable result and its checked indicator while leaving selection and command execution with the primitive and caller. */
function CommandItem(props: ComponentProps<typeof CommandPrimitive.Item>) {
  const [local, others] = splitProps(props, ["class", "children"]);
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      class={cn(
        "group/command-item z-command-item flex items-center data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        local.class,
      )}
      {...others}
    >
      {local.children}
      <Check class="z-command-item-indicator ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" />
    </CommandPrimitive.Item>
  );
}

/** Display a command's shortcut hint without installing a keyboard handler. */
function CommandShortcut(props: ComponentProps<"span">) {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <span data-slot="command-shortcut" class={cn("z-command-shortcut", local.class)} {...others} />
  );
}

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
