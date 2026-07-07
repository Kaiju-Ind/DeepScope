import type { TechnologyDefinition } from '../../types';

export const finalsiteTechnologyDefinition = {
	id: "finalsite",
	name: "Finalsite",
	website: "https://www.finalsite.com/school-websites",
	description: "Finalsite is a web design and software for schools.",
	icon: "Finalsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "finalsite:dom:0",
			kind: "dom",
			selector: "div[id*='fsPoweredByFinalsite']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
