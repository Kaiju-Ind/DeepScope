import type { TechnologyDefinition } from '../../types';

export const assertiveYieldTechnologyDefinition = {
	id: "assertive-yield",
	name: "Assertive Yield",
	website: "https://www.assertiveyield.com",
	description: "Assertive Yield is a SaaS company that specialises in helping SSPs (Supply-Side Platforms), publishers, and ad networks optimise their advertising revenue through real-time attribution and yield optimisation strategies.",
	icon: "Assertive Yield.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "assertive-yield:jsGlobal:0",
			kind: "jsGlobal",
			property: "assertive.predict",
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
