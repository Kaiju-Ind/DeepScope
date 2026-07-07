import type { TechnologyDefinition } from '../../types';

export const cooladataTechnologyDefinition = {
	id: "cooladata",
	name: "Cooladata",
	website: "https://www.cooladata.com",
	description: "Cooladata is a data warehouse and behavioral analytics platform designed for gaming, elearning, ecommerce, SaaS, and media companies.",
	icon: "Cooladata.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "cooladata:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.cooladata\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cooladata:jsGlobal:1",
			kind: "jsGlobal",
			property: "cooladata",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
