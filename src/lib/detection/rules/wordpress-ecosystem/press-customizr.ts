import type { TechnologyDefinition } from '../../types';

export const pressCustomizrTechnologyDefinition = {
	id: "press-customizr",
	name: "Press Customizr",
	website: "https://presscustomizr.com/customizr",
	description: "Press Customizr is a multipurpose WordPress theme suitable for small businesses and ecommerce sites.",
	icon: "Press.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "press-customizr:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/customizr\\/.+js(?:\\?ver=([\\d\\.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "press-customizr:dom:1",
			kind: "dom",
			selector: "style#customizr-skin-inline-css, link#customizr-style-css",
			description: "DOM selector matches a known technology marker.",
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
