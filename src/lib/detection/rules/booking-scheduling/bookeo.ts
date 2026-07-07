import type { TechnologyDefinition } from '../../types';

export const bookeoTechnologyDefinition = {
	id: "bookeo",
	name: "Bookeo",
	website: "https://www.bookeo.com",
	description: "Bookeo is a cloud-based booking and reservation solution that caters to tour operators, travel agencies, schools, therapists, photographers and event organizers.",
	icon: "Bookeo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookeo:dom:0",
			kind: "dom",
			selector: "a[href*='//bookeo.com/'], iframe[src*='//bookeo.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "bookeo:jsGlobal:1",
			kind: "jsGlobal",
			property: "bookeo_start",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bookeo:jsGlobal:2",
			kind: "jsGlobal",
			property: "bookeo_startMobileLabel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
