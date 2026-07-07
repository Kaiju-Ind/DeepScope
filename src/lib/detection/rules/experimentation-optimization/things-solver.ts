import type { TechnologyDefinition } from '../../types';

export const thingsSolverTechnologyDefinition = {
	id: "things-solver",
	name: "Things Solver",
	website: "https://thingsolver.com",
	description: "Things Solver is a business platform that improves customer experience by delivering personalized content and recommendations on its website.",
	icon: "ThingsSolver.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "things-solver:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.thingsolver\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
