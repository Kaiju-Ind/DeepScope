import type { TechnologyDefinition } from '../../types';

export const loopsTechnologyDefinition = {
	id: "loops",
	name: "Loops",
	website: "https://loops.so",
	description: "Loops is a platform that simplifies email marketing for SaaS companies, offering campaign creation and tracking.",
	icon: "Loops.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "loops:dom:0",
			kind: "dom",
			selector: "form[action*='app.loops.so/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
