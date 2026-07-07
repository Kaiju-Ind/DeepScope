import type { TechnologyDefinition } from '../../types';

export const frontleadTechnologyDefinition = {
	id: "frontlead",
	name: "Frontlead",
	website: "https://frontlead.io",
	description: "Frontlead is a platform that enables the creation of forms, funnels, and surveys to streamline workflows and collect actionable insights.",
	icon: "Frontlead.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "frontlead:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.frontlead\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
