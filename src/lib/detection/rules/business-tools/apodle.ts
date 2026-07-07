import type { TechnologyDefinition } from '../../types';

export const apodleTechnologyDefinition = {
	id: "apodle",
	name: "Apodle",
	website: "https://apodle.com",
	description: "Apodle is a generic business management solution designed to support a range of operational and administrative functions across various industries.",
	icon: "Apodle.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "apodle:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.apodle\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "apodle:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.apodle\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
