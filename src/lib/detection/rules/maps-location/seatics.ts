import type { TechnologyDefinition } from '../../types';

export const seaticsTechnologyDefinition = {
	id: "seatics",
	name: "Seatics",
	website: "https://seatics.com",
	description: "Seatics is a platform that provides interactive maps for venues like arenas, stadiums, and convention centers, displaying seating arrangements, concession stands, restrooms, and other key locations.",
	icon: "Seatics.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "seatics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tn-widget\\.seatics\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
