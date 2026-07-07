import type { TechnologyDefinition } from '../../types';

export const brainsinsTechnologyDefinition = {
	id: "brainsins",
	name: "BrainSINS",
	website: "https://brainsins.com",
	description: "BrainSINS is a personalisation technology and ecommerce analytics services to online retailers.",
	icon: "BrainSINS.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "brainsins:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mw\\.brainsins\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brainsins:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cloudfront\\.net\\/brainsins(?:_v)?(\\d+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "brainsins:jsGlobal:2",
			kind: "jsGlobal",
			property: "BrainSINS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brainsins:jsGlobal:3",
			kind: "jsGlobal",
			property: "BrainSINSRecommender",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brainsins:jsGlobal:4",
			kind: "jsGlobal",
			property: "brainsins_token",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "brainsins:jsGlobal:5",
			kind: "jsGlobal",
			property: "launchBrainSINS",
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
