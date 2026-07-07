import type { TechnologyDefinition } from '../../types';

export const mainboardTechnologyDefinition = {
	id: "mainboard",
	name: "Mainboard",
	website: "https://www.mainboard.com",
	description: "Mainboard is a software platform designed to manage, schedule, and book talent.",
	icon: "Mainboard.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "mainboard:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Mainboard\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mainboard:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mainboard\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
