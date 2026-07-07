import type { TechnologyDefinition } from '../../types';

export const kairaVogueTechnologyDefinition = {
	id: "kaira-vogue",
	name: "Kaira Vogue",
	website: "https://kairaweb.com/wordpress-theme/vogue",
	description: "Vogue is a very easy to use multipurpose WordPress theme created by Kaira.",
	icon: "Kaira.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "kaira-vogue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/vogue(?:-child)?\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "kaira-vogue:dom:1",
			kind: "dom",
			selector: "link#vogue-style-css",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
