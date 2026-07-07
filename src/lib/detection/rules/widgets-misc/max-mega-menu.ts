import type { TechnologyDefinition } from '../../types';

export const maxMegaMenuTechnologyDefinition = {
	id: "max-mega-menu",
	name: "Max Mega Menu",
	website: "https://www.megamenu.com/",
	description: "Max Mega Menu is a popular WordPress plugin that enhances the menu functionality on WordPress websites.",
	icon: "Max Mega Menu.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "max-mega-menu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:max)?megamenu(?:-pro)?(?:\\/assets)?(?:\\/public)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "max-mega-menu:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/maxmegamenu/'], link[href*='/wp-content/plugins/megamenu-pro/'], link#megamenu-css, .mega-menu, .max-mega-menu, .mega-menu-megamenu, .mega-menu-primary, .mega-menu-item",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "max-mega-menu:jsGlobal:2",
			kind: "jsGlobal",
			property: "megamenu",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
