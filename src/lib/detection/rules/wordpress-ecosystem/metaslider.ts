import type { TechnologyDefinition } from '../../types';

export const metasliderTechnologyDefinition = {
	id: "metaslider",
	name: "MetaSlider",
	website: "https://www.metaslider.com",
	description: "MetaSlider is a WordPress plugin for adding responsive sliders and carousels to websites.",
	icon: "MetaSlider.svg",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "metaslider:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/ml-slider(?:-pro)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "metaslider:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/ml-slider/'], link#metaslider-pro-public-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:matchalabs:metaslider:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
