import type { TechnologyDefinition } from '../../types';

export const iceTechnologyDefinition = {
	id: "ice",
	name: "ICE",
	website: "https://www.enterice.com/web/",
	description: "ICE is integrated customer engagement software designed to streamline communication, support, and interaction across multiple channels for businesses.",
	icon: "Enterice.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ice:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.enterice\\.com\\/"),
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
