import type { TechnologyDefinition } from '../../types';

export const smartpointTechnologyDefinition = {
	id: "smartpoint",
	name: "Smartpoint",
	website: "https://smartpoint.pro",
	description: "Smartpoint is a car dealer conversion optimization system that improves lead capture and sales performance through data-driven tools and customer engagement features.",
	icon: "SmartPoint.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "smartpoint:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("panel\\.smartpoint\\.pro\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
