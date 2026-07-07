import type { TechnologyDefinition } from '../../types';

export const monetateTechnologyDefinition = {
	id: "monetate",
	name: "Monetate",
	website: "https://monetate.com",
	description: "Monetate is a company that specializes in providing personalisation and customer experience optimisation solutions to businesses.",
	icon: "Monetate.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "monetate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.monetate\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "monetate:jsGlobal:1",
			kind: "jsGlobal",
			property: "monetate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monetate:jsGlobal:2",
			kind: "jsGlobal",
			property: "monetateQ",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monetate:jsGlobal:3",
			kind: "jsGlobal",
			property: "monetateT",
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
