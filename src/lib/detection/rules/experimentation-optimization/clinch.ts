import type { TechnologyDefinition } from '../../types';

export const clinchTechnologyDefinition = {
	id: "clinch",
	name: "Clinch",
	website: "https://clinch.co/",
	description: "Clinch delivers hyper-personalized creative experiences and consumer intelligence across all channels.",
	icon: "Clinch.png",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "clinch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.clinch\\.co"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
