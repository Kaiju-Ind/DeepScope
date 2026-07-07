import type { TechnologyDefinition } from '../../types';

export const colorlibActivelloTechnologyDefinition = {
	id: "colorlib-activello",
	name: "Colorlib Activello",
	website: "https://colorlib.com/wp/themes/activello",
	description: "Colorlib Activello is a clean, minimal multipurpose WordPress blog theme developer using the Bootstrap frontend framework making it fully responsive and mobile-friendly.",
	icon: "Colorlib.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "colorlib-activello:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/activello\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "colorlib-activello:dom:1",
			kind: "dom",
			selector: "link#activello-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "colorlib-activello:jsGlobal:2",
			kind: "jsGlobal",
			property: "ActivelloIsMobile",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
