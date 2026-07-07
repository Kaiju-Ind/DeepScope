import type { TechnologyDefinition } from '../../types';

export const ampedTechnologyDefinition = {
	id: "amped",
	name: "Amped",
	website: "https://www.amped.io",
	description: "Amped is a popup tool designed for growth, enabling email and SMS popups to capture leads and engage users.",
	icon: "Amped.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "amped:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.amped\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "amped:dom:1",
			kind: "dom",
			selector: "link[href*='app.amped.io']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
