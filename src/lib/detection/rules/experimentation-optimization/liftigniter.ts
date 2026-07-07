import type { TechnologyDefinition } from '../../types';

export const liftigniterTechnologyDefinition = {
	id: "liftigniter",
	name: "LiftIgniter",
	website: "https://www.liftigniter.com",
	description: "LiftIgniter is a personalized content system designed to tailor recommendations and content to individual users based on their preferences and behaviours.",
	icon: "LiftIgniter.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "liftigniter:dom:0",
			kind: "dom",
			selector: "phoenix-script[script-id*='liftigniter-init']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "liftigniter:jsGlobal:1",
			kind: "jsGlobal",
			property: "liftIgniterLoadPromise",
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
