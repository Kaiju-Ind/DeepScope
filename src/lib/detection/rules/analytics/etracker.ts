import type { TechnologyDefinition } from '../../types';

export const etrackerTechnologyDefinition = {
	id: "etracker",
	name: "Etracker",
	website: "https://www.etracker.com",
	description: "Etracker is a web optimisation solution.",
	icon: "Etracker.png",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "etracker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.etracker\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "etracker:jsGlobal:1",
			kind: "jsGlobal",
			property: "_etracker",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
