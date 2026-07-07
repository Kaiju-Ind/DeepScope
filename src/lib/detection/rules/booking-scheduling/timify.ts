import type { TechnologyDefinition } from '../../types';

export const timifyTechnologyDefinition = {
	id: "timify",
	name: "Timify",
	website: "https://www.timify.com",
	description: "Timify is an online scheduling and resource management software for small, medium and large businesses.",
	icon: "Timify.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "timify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.timify\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "timify:jsGlobal:1",
			kind: "jsGlobal",
			property: "TimifyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
