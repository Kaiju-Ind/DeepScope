import type { TechnologyDefinition } from '../../types';

export const containerMediaGroupTechnologyDefinition = {
	id: "container-media-group",
	name: "Container Media Group",
	website: "https://containermedia.net",
	description: "Container Media Group offers technical solutions for agencies and brands to plan, execute, optimise, and report on advertising campaigns. They specialise in creating engaging custom creatives and utilise advanced tracking pixels to monitor user advertising activity across media channels.",
	icon: "Container Media Group.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "container-media-group:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.containermedia\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
