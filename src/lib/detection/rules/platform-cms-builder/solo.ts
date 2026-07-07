import type { TechnologyDefinition } from '../../types';

export const soloTechnologyDefinition = {
	id: "solo",
	name: "Solo",
	website: "https://soloist.ai",
	description: "Solo is a free AI website creator that builds professional websites for businesses using minimal inputs.",
	icon: "Solo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "solo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.soloist\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
