import type { TechnologyDefinition } from '../../types';

export const saffireTechnologyDefinition = {
	id: "saffire",
	name: "Saffire",
	website: "https://www.saffire.com",
	description: "Saffire is a ticketing and CMS system.",
	icon: "Saffire.svg",
	categories: [
		"platform-cms-builder",
		"booking-scheduling",
	],
	rules: [
		{
			id: "saffire:jsGlobal:0",
			kind: "jsGlobal",
			property: "saffire.angular",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"angularjs",
	],
} as const satisfies TechnologyDefinition;
