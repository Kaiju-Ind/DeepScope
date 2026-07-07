import type { TechnologyDefinition } from '../../types';

export const splineTechnologyDefinition = {
	id: "spline",
	name: "Spline",
	website: "https://spline.design",
	description: "Spline is a platform for designing and collaborating on 3D content in real time.",
	icon: "Spline.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "spline:dom:0",
			kind: "dom",
			selector: "div[data-spline-url*='prod.spline.design/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
