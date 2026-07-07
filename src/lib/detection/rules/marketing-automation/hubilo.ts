import type { TechnologyDefinition } from '../../types';

export const hubiloTechnologyDefinition = {
	id: "hubilo",
	name: "Hubilo",
	website: "https://www.hubilo.com",
	description: "Hubilo is a platform offering branded interactive experiences, AI-driven content repurposing, and behavioral analytics to maximize webinar ROI.",
	icon: "Hubilo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "hubilo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.hubilo\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
