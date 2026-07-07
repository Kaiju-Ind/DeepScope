import type { TechnologyDefinition } from '../../types';

export const naturalIntelligenceTechnologyDefinition = {
	id: "natural-intelligence",
	name: "Natural Intelligence",
	website: "https://www.naturalint.com/",
	description: "Natural Intelligence is a platform facilitating product discovery.",
	icon: "NaturalIntelligence.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "natural-intelligence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.naturalint\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "natural-intelligence:jsGlobal:1",
			kind: "jsGlobal",
			property: "naturalint_tag",
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
