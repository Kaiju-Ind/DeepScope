import type { TechnologyDefinition } from '../../types';

export const datatricsTechnologyDefinition = {
	id: "datatrics",
	name: "Datatrics",
	website: "https://datatrics.com",
	description: "Datatrics is a data-driven marketing platform that provides businesses with advanced tools and analytics to optimise customer experiences, personalise marketing campaigns, and drive engagement through data-driven insights and automation.",
	icon: "Datatrics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "datatrics:dom:0",
			kind: "dom",
			selector: "link[href*='.datatrics.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "datatrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "DatatricsClick",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "datatrics:jsGlobal:2",
			kind: "jsGlobal",
			property: "datatricsEvents",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
