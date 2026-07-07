import type { TechnologyDefinition } from '../../types';

export const termedTechnologyDefinition = {
	id: "termed",
	name: "TerMed",
	website: "https://www.termed.de",
	description: "TerMed is a platform that simplifies online booking of medical appointments.",
	icon: "TerMed.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "termed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.termed\\.de"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "termed:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.termed\\.de"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
