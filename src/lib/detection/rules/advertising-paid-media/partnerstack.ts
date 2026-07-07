import type { TechnologyDefinition } from '../../types';

export const partnerstackTechnologyDefinition = {
	id: "partnerstack",
	name: "PartnerStack",
	website: "https://partnerstack.com",
	description: "PartnerStack is a platform facilitating SaaS brand growth through streamlined partner management.",
	icon: "PartnerStack.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "partnerstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.growsumo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "partnerstack:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.partnerstack\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "partnerstack:jsGlobal:2",
			kind: "jsGlobal",
			property: "growsumo",
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
