import type { TechnologyDefinition } from '../../types';

export const forkAwesomeTechnologyDefinition = {
	id: "fork-awesome",
	name: "Fork Awesome",
	website: "https://forkaweso.me",
	description: "Fork Awesome is now a community effort based on Font Awesome by Dave Gandy.",
	icon: "Fork Awesome.png",
	categories: [
		"styling-library",
	],
	rules: [
		{
			id: "fork-awesome:dom:0",
			kind: "dom",
			selector: "link[href*='fork-awesome.min.css']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "fork-awesome:dom:1",
			kind: "dom",
			selector: "link[href*='npm/fork-awesome']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
