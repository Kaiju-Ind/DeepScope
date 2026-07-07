import type { TechnologyDefinition } from '../../types';

export const gruviTechnologyDefinition = {
	id: "gruvi",
	name: "Gruvi",
	website: "https://www.gruvi.tv",
	description: "Gruvi is a movie marketing network that provides promotional tools and services to the film industry, facilitating audience engagement and increasing visibility for films through targeted campaigns and digital strategies.",
	icon: "Gruvi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "gruvi:dom:0",
			kind: "dom",
			selector: "link[href*='.gruvi.tv/movies/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
