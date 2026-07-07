import type { TechnologyDefinition } from '../../types';

export const genesisThemeTechnologyDefinition = {
	id: "genesis-theme",
	name: "Genesis theme",
	website: "https://www.studiopress.com/themes/genesis",
	description: "Genesis theme is a WordPress theme that has been developed using the Genesis Framework from Studiopress.",
	icon: "Genesis theme.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "genesis-theme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/genesis\\/lib\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "genesis-theme:jsGlobal:1",
			kind: "jsGlobal",
			property: "genesisBlocksShare",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "genesis-theme:jsGlobal:2",
			kind: "jsGlobal",
			property: "genesis_responsive_menu",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "genesis-theme:dom:3",
			kind: "dom",
			selector: "body[class*='theme-genesis']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "genesis-theme:dom:4",
			kind: "dom",
			selector: "body[class*='genesis-breadcrumbs-hidden']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "genesis-theme:dom:5",
			kind: "dom",
			selector: "body[class*='genesis-title-hidden']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
