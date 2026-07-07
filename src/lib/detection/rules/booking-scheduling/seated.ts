import type { TechnologyDefinition } from '../../types';

export const seatedTechnologyDefinition = {
	id: "seated",
	name: "Seated",
	website: "https://www.seated.com",
	description: "Seated is a platform offering a ticketing system for live events and live streams.",
	icon: "Seated.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "seated:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.seated\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
