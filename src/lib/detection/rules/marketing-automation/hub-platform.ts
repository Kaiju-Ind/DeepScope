import type { TechnologyDefinition } from '../../types';

export const hubPlatformTechnologyDefinition = {
	id: "hub-platform",
	name: "Hub Platform",
	website: "https://www.hub-js.com",
	description: "Hub Platform is a suite of data-driven marketing and customer experience management solutions.",
	icon: "HubPlatform.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hub-platform:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("analytics\\.hub-js\\.com"),
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
