import type { TechnologyDefinition } from '../../types';

export const admostTechnologyDefinition = {
	id: "admost",
	name: "Admost",
	website: "https://admost.com/",
	description: "Admost is a full-cycle monetisation system for app publishers, featuring mediation, revenue analytics, and cross-promotion through a single SDK.",
	icon: "Admost.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "admost:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("run\\.admost\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
