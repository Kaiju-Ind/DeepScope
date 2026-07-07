import type { TechnologyDefinition } from '../../types';

export const premionTechnologyDefinition = {
	id: "premion",
	name: "Premion",
	website: "https://premion.com",
	description: "Premion is an over-the-top (OTT) advertising platform that enables advertisers to deliver targeted ads across premium streaming content.",
	icon: "Premion.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "premion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("px\\.premion\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
