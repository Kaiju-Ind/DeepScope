import type { TechnologyDefinition } from '../../types';

export const bookafyTechnologyDefinition = {
	id: "bookafy",
	name: "Bookafy",
	website: "https://bookafy.com",
	description: "Bookafy is a service that offers appointment scheduling and booking solutions for businesses and professionals.",
	icon: "Bookafy.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookafy:jsGlobal:0",
			kind: "jsGlobal",
			property: "bookafyPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookafy:jsGlobal:1",
			kind: "jsGlobal",
			property: "openBookafyPopup",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
