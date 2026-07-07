import type { TechnologyDefinition } from '../../types';

export const sherlockTechnologyDefinition = {
	id: "sherlock",
	name: "Sherlock",
	website: "https://sherlocksoftware.com",
	description: "Sherlock is a platform that offers specialized real estate property management software, including trust accounting, for residential, commercial, sales, and holiday properties.",
	icon: "Sherlock.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sherlock:jsGlobal:0",
			kind: "jsGlobal",
			property: "Sherlock_favourite_properties",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
