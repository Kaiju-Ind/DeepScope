import type { TechnologyDefinition } from '../../types';

export const optuneTechnologyDefinition = {
	id: "optune",
	name: "OpTuNE",
	website: "https://www.optune.me",
	description: "OpTuNE is an online platform for booking and managing events, designed for artists, venues, and promoters.",
	icon: "OpTuNE.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "optune:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.optune\\.me"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
