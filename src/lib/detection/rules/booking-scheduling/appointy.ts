import type { TechnologyDefinition } from '../../types';

export const appointyTechnologyDefinition = {
	id: "appointy",
	name: "Appointy",
	website: "https://www.appointy.com/",
	description: "Appointy is a cloud-based scheduling solution that helps professionals and businesses to manage their appointment scheduling activities and routines.",
	icon: "Appointy.png",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "appointy:dom:0",
			kind: "dom",
			selector: "a[href*='.appointy.com/'][target='_blank'], iframe[src*='.appointy.com/']",
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
