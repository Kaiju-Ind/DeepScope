import type { TechnologyDefinition } from '../../types';

export const delaconTechnologyDefinition = {
	id: "delacon",
	name: "Delacon",
	website: "https://www.delacon.com.au",
	description: "Delacon provides Australian businesses with Call Tracking, Call Management and Speech Analytics solutions.",
	icon: "Delacon.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "delacon:jsGlobal:0",
			kind: "jsGlobal",
			property: "dela_247_call",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "delacon:jsGlobal:1",
			kind: "jsGlobal",
			property: "delaconphonenums",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
