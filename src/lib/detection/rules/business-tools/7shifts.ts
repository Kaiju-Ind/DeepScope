import type { TechnologyDefinition } from '../../types';

export const technology7shiftsTechnologyDefinition = {
	id: "7shifts",
	name: "7Shifts",
	website: "https://www.7shifts.com",
	description: "7Shifts is an all-in-one team management platform designed to streamline restaurant operations, providing tools for scheduling, communication, and task management to simplify day-to-day activities for both managers and staff.",
	icon: "7Shifts.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "7shifts:dom:0",
			kind: "dom",
			selector: "a[href*='7shifts.com/'] > img[src*='.7shifts.com/']",
			description: "DOM selector matches a known technology marker.",
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
