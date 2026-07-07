import type { TechnologyDefinition } from '../../types';

export const adobeTargetTechnologyDefinition = {
	id: "adobe-target",
	name: "Adobe Target",
	website: "https://www.adobe.com/marketing/target.html",
	description: "Adobe Target is an A/B testing, multi-variate testing, personalization, and optimization application.",
	icon: "Adobe.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "adobe-target:jsGlobal:0",
			kind: "jsGlobal",
			property: "adobe.target",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "adobe-target:jsGlobal:1",
			kind: "jsGlobal",
			property: "adobe.target.VERSION",
			valuePattern: new RegExp("^(.+)$"),
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
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
