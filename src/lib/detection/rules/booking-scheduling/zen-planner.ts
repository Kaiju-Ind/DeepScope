import type { TechnologyDefinition } from '../../types';

export const zenPlannerTechnologyDefinition = {
	id: "zen-planner",
	name: "Zen Planner",
	website: "https://zenplanner.com",
	description: "Zen Planner is a software platform designed for fitness and wellness businesses, offering features such as membership management, class scheduling, and billing automation.",
	icon: "Zen Planner.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "zen-planner:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zenplanner\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zen-planner:jsGlobal:1",
			kind: "jsGlobal",
			property: "zenplanner",
			description: "Page-owned global matches a known technology marker.",
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
