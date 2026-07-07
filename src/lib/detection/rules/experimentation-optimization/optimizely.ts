import type { TechnologyDefinition } from '../../types';

export const optimizelyTechnologyDefinition = {
	id: "optimizely",
	name: "Optimizely",
	website: "https://www.optimizely.com",
	description: "Optimizely is an experimentation platform that helps developers build and run A/B tests on websites.",
	icon: "Optimizely.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "optimizely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("optimizely\\.com.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "optimizely:jsGlobal:1",
			kind: "jsGlobal",
			property: "optimizely",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "optimizely:jsGlobal:2",
			kind: "jsGlobal",
			property: "optimizelyClient.clientVersion",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "optimizely:jsGlobal:3",
			kind: "jsGlobal",
			property: "optimizelySdk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "optimizely:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^optimizelyEndUserId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "optimizely:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^optimizelyenduserid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
