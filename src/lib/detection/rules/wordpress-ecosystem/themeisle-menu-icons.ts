import type { TechnologyDefinition } from '../../types';

export const themeisleMenuIconsTechnologyDefinition = {
	id: "themeisle-menu-icons",
	name: "ThemeIsle Menu Icons",
	website: "https://wordpress.org/plugins/menu-icons",
	description: "ThemeIsle Menu Icons plugin gives you the ability to add icons to your menu items, similar to the look of the latest dashboard menu.",
	icon: "ThemeIsle.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "themeisle-menu-icons:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/menu-icons/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
