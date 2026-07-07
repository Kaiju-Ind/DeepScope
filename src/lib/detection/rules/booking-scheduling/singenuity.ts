import type { TechnologyDefinition } from '../../types';

export const singenuityTechnologyDefinition = {
	id: "singenuity",
	name: "Singenuity",
	website: "https://singenuity.com",
	description: "Singenuity is a software platform that enables customers to book tours and attractions online through a centralized digital system.",
	icon: "Singenuity.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "singenuity:jsGlobal:0",
			kind: "jsGlobal",
			property: "__CONFIG_URL",
			valuePattern: new RegExp("book\\.singenuity\\.com"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
