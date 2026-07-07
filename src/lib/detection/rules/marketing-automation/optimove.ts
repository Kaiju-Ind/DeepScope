import type { TechnologyDefinition } from '../../types';

export const optimoveTechnologyDefinition = {
	id: "optimove",
	name: "Optimove",
	website: "https://www.optimove.com",
	description: "Optimove is a relationship marketing hub powered by a combination of advanced customer modeling, predictive micro-segmentation and campaign automation technologies.",
	icon: "Optimove.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "optimove:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.optimove\\.net\\/.+v([\\d\\.]+)\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimove:jsGlobal:1",
			kind: "jsGlobal",
			property: "optimoveSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "optimove:jsGlobal:2",
			kind: "jsGlobal",
			property: "optimoveSDKVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
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
