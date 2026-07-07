import type { TechnologyDefinition } from '../../types';

export const volumentTechnologyDefinition = {
	id: "volument",
	name: "Volument",
	website: "https://volument.com",
	description: "Volument is a conversion optimization analytics platform that analyzes user behavior, measures performance, and identifies opportunities to improve digital experience and outcomes.",
	icon: "Volument.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "volument:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.volument\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
