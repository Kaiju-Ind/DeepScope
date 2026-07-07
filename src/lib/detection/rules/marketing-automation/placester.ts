import type { TechnologyDefinition } from '../../types';

export const placesterTechnologyDefinition = {
	id: "placester",
	name: "Placester",
	website: "https://placester.com",
	description: "Placester is an all-in-one digital marketing platform designed for real estate professionals to manage websites, lead generation, and online branding.",
	icon: "Placester.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "placester:jsGlobal:0",
			kind: "jsGlobal",
			property: "_placester.entitlements",
			description: "Page-owned global matches a known technology marker.",
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
