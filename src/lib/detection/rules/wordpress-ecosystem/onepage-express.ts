import type { TechnologyDefinition } from '../../types';

export const onepageExpressTechnologyDefinition = {
	id: "onepage-express",
	name: "OnePage Express",
	website: "https://onepageexpress.com",
	description: "OnePage Express is a beautiful WordPress theme that can be used to create an one page website in minutes by drag and drop.",
	icon: "ExtendThemes.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "onepage-express:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/one-page-express(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "onepage-express:dom:1",
			kind: "dom",
			selector: "link#one-page-express-style-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "onepage-express:jsGlobal:2",
			kind: "jsGlobal",
			property: "one_page_express_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
