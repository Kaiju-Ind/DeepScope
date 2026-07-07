import type { TechnologyDefinition } from '../../types';

export const tourcmsTechnologyDefinition = {
	id: "tourcms",
	name: "TourCMS",
	website: "https://www.tourcms.com",
	description: "TourCMS is a platform designed for tour and activity operators, offering solutions for managing online and offline bookings and distribution.",
	icon: "TourCMS.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "tourcms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mp\\.tourcms\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tourcms:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("mp\\.tourcms\\.com"),
			description: "Script content contains a bounded technology signature.",
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
