import type { TechnologyDefinition } from '../../types';

export const propfloTechnologyDefinition = {
	id: "propflo",
	name: "PropFlo",
	website: "https://www.propflo.ai",
	description: "PropFlo is an AI-powered real estate CRM designed for developers and channel partners to streamline customer relationship management and enhance sales processes.",
	icon: "PropFlo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "propflo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.propflo\\.ai"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
