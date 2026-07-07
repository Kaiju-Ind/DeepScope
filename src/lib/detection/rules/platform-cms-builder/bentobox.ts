import type { TechnologyDefinition } from '../../types';

export const bentoboxTechnologyDefinition = {
	id: "bentobox",
	name: "Bentobox",
	website: "https://getbento.com",
	description: "Bentobox is a restaurant website platform that handles menus, reservations, gift cards and more.",
	icon: "Bentobox.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "bentobox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getbento\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bentobox:jsGlobal:1",
			kind: "jsGlobal",
			property: "BentoAnalytics",
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
