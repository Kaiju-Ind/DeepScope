import type { TechnologyDefinition } from '../../types';

export const digitalShowroomTechnologyDefinition = {
	id: "digital-showroom",
	name: "Digital Showroom",
	website: "https://digitalshowroom.in",
	description: "Digital Showroom is an ecommerce platform.",
	icon: "Digital Showroom.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "digital-showroom:dom:0",
			kind: "dom",
			selector: "div.dd-showrom__layout",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
