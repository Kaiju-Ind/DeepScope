import type { TechnologyDefinition } from '../../types';

export const arcspanTechnologyDefinition = {
	id: "arcspan",
	name: "ArcSpan",
	website: "https://www.arcspan.com",
	description: "ArcSpan is an audience monetization DMP platform enabling direct sold and programmatic deal results for the world’s finest publishers and retail media networks.",
	icon: "ArcSpan.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "arcspan:jsGlobal:0",
			kind: "jsGlobal",
			property: "aspan",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arcspan:jsGlobal:1",
			kind: "jsGlobal",
			property: "aspan_extern",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "arcspan:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^arcid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "arcspan:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^aspan_s$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
