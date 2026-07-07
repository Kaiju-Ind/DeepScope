import type { TechnologyDefinition } from '../../types';

export const amobeeTechnologyDefinition = {
	id: "amobee",
	name: "Amobee",
	website: "https://www.amobee.com",
	description: "Amobee is a cloud-based advertising and data management platform.",
	icon: "Amobee.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "amobee:dom:0",
			kind: "dom",
			selector: "img[src*='.turn.com/r/beacon']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
