import type { TechnologyDefinition } from '../../types';

export const innervateTechnologyDefinition = {
	id: "innervate",
	name: "Innervate",
	website: "https://www.innervate.com",
	description: "Innervate is a company that provides a plug-and-play solution for dynamic customer experience orchestration across various formats and channels, leveraging existing systems, data, and teams to enhance and streamline customer interactions.",
	icon: "Innervate.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "innervate:dom:0",
			kind: "dom",
			selector: "link[href*='.revjet.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
