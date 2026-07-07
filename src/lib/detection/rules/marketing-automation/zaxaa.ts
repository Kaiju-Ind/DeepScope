import type { TechnologyDefinition } from '../../types';

export const zaxaaTechnologyDefinition = {
	id: "zaxaa",
	name: "Zaxaa",
	website: "https://zaxaa.com",
	description: "Zaxaa is a sales funnel service designed to streamline the process of managing leads, nurturing prospects, and converting them into customers.",
	icon: "Zaxaa.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "zaxaa:dom:0",
			kind: "dom",
			selector: "a[href*='.zaxaa.com'] > img[src*='www.zaxaa.com']",
			description: "DOM selector matches a known technology marker.",
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
