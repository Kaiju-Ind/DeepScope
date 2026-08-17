import {
	createLink,
	type LinkComponent,
} from '@tanstack/solid-router'

import {
	Button,
	type ButtonProps,
} from '@/ui/button.tsx'
import {
	SidebarMenuButton,
	type SidebarMenuButtonProps,
} from '@/ui/sidebar.tsx'

type ButtonLinkBaseProps =
	Omit<ButtonProps<'a'>, 'as'>

/**
 * Renders TanStack Router's resolved anchor props through the complete
 * Zaidan Button component.
 */
function ButtonLinkBase(
	props: ButtonLinkBaseProps,
) {
	return (
		<Button
			as='a'
			{...props}
		/>
	)
}

const CreatedButtonLink =
	createLink(ButtonLinkBase)

/**
 * A route-typed link with Zaidan button behavior and presentation.
 */
export const ButtonLink: LinkComponent<
	typeof ButtonLinkBase
> = (props) => (
	<CreatedButtonLink
		preload='intent'
		{...props}
	/>
)

type SidebarMenuLinkBaseProps =
	Omit<SidebarMenuButtonProps<'a'>, 'as'>

/**
 * Renders TanStack Router's resolved anchor props through the complete
 * SidebarMenuButton component.
 */
function SidebarMenuLinkBase(
	props: SidebarMenuLinkBaseProps,
) {
	return (
		<SidebarMenuButton
			as='a'
			{...props}
		/>
	)
}

const CreatedSidebarMenuLink =
	createLink(SidebarMenuLinkBase)

/**
 * A route-typed link retaining SidebarMenuButton behavior, variants,
 * sidebar state, data attributes, and optional collapsed tooltip.
 */
export const SidebarMenuLink: LinkComponent<
	typeof SidebarMenuLinkBase
> = (props) => (
	<CreatedSidebarMenuLink
		preload='intent'
		{...props}
	/>
)