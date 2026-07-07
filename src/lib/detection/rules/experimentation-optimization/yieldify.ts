import type { TechnologyDefinition } from '../../types';

export const yieldifyTechnologyDefinition = {
	id: "yieldify",
	name: "Yieldify",
	website: "https://www.yieldify.com",
	description: "Yieldify is a customer journey optimisation platform that brings personalisation to the full customer journey.",
	icon: "Yieldify.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "yieldify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.yieldify\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yieldify:jsGlobal:1",
			kind: "jsGlobal",
			property: "_yieldify",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
