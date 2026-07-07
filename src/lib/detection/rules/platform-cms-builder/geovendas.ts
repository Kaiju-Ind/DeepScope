import type { TechnologyDefinition } from '../../types';

export const geovendasTechnologyDefinition = {
	id: "geovendas",
	name: "GEOvendas",
	website: "https://www.geovendas.com",
	description: "GEOvendas is an ecommerce platform with analytics, sales force, B2B and B2C products.",
	icon: "GEOvendas.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "geovendas:dom:0",
			kind: "dom",
			selector: "a[href*='geovendas.com.br'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
