import type { TechnologyDefinition } from '../../types';

export const convertiserTechnologyDefinition = {
	id: "convertiser",
	name: "Convertiser",
	website: "https://convertiser.com",
	description: "Convertiser is a website monetization platform from Poland that helps publishers and advertisers optimize revenue through performance-based marketing solutions.",
	icon: "Convertiser.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "convertiser:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.convertiser\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertiser:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.convertiser\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
