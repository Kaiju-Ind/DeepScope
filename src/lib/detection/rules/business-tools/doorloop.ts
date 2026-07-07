import type { TechnologyDefinition } from '../../types';

export const doorloopTechnologyDefinition = {
	id: "doorloop",
	name: "DoorLoop",
	website: "https://www.doorloop.com",
	description: "DoorLoop is a property management software designed to streamline tasks such as leasing, accounting, maintenance tracking, and tenant communication.",
	icon: "DoorLoop.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "doorloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.doorloop\\.com"),
			description: "Script source URL matches a known technology marker.",
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
