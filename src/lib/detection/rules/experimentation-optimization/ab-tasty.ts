import type { TechnologyDefinition } from '../../types';

export const abTastyTechnologyDefinition = {
	id: "ab-tasty",
	name: "AB Tasty",
	website: "https://www.abtasty.com",
	description: "AB Tasty is a customer experience optimisation company. AB Tasty offers AI-driven experimentation, personalisation, and product optimisation platforms for user testing.",
	icon: "AB Tasty.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "ab-tasty:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("try\\.abtasty\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ab-tasty:jsGlobal:1",
			kind: "jsGlobal",
			property: "ABTasty",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ab-tasty:jsGlobal:2",
			kind: "jsGlobal",
			property: "_abtasty",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ab-tasty:jsGlobal:3",
			kind: "jsGlobal",
			property: "loadABTasty",
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
