import type { TechnologyDefinition } from '../../types';

export const blueshiftTechnologyDefinition = {
	id: "blueshift",
	name: "Blueshift",
	website: "https://blueshift.com/",
	description: "Blueshift offers the SmartHub CDP, which helps brands deliver relevant and connected experiences across every customer interaction.",
	icon: "Blueshift.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "blueshift:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn.getblueshift.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
