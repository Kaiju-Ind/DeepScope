import type { TechnologyDefinition } from '../../types';

export const glowTechnologyDefinition = {
	id: "glow",
	name: "Glow",
	website: "https://glowloyalty.com",
	description: "Glow is a rewards platform that helps businesses increase repeat sales by encouraging one-time buyers to return through structured customer retention programs.",
	icon: "Glow.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "glow:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.glowloyalty\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
