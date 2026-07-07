import type { TechnologyDefinition } from '../../types';

export const iconosquareTechnologyDefinition = {
	id: "iconosquare",
	name: "Iconosquare",
	website: "https://www.iconosquare.com",
	description: "Iconosquare is an all-in-one social media management platform that facilitates the lives of SMMs with multiple profiles to manage.",
	icon: "Iconosquare.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "iconosquare:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.iconosquare\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "iconosquare:dom:1",
			kind: "dom",
			selector: "iframe[src*='iconosquare.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
