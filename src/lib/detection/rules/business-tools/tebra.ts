import type { TechnologyDefinition } from '../../types';

export const tebraTechnologyDefinition = {
	id: "tebra",
	name: "Tebra",
	website: "https://www.tebra.com",
	description: "Tebra is an all-in-one EHR solution designed to streamline practice operations, improve patient care, and support financial performance.",
	icon: "Tebra.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "tebra:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("www\\.tebra\\.com"),
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
