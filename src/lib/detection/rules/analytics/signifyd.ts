import type { TechnologyDefinition } from '../../types';

export const signifydTechnologyDefinition = {
	id: "signifyd",
	name: "Signifyd",
	website: "https://www.signifyd.com",
	description: "Signifyd is a provider of an enterprise-grade fraud technology solution for ecommerce stores.",
	icon: "Signifyd.svg",
	categories: [
		"analytics",
		"security",
	],
	rules: [
		{
			id: "signifyd:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.signifyd\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "signifyd:jsGlobal:1",
			kind: "jsGlobal",
			property: "SIGNIFYD_GLOBAL",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
