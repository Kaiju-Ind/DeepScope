import type { TechnologyDefinition } from '../../types';

export const plazaTechnologyDefinition = {
	id: "plaza",
	name: "Plaza",
	website: "https://www.useplaza.com",
	description: "Plaza is a ecommerce platform that allows brands and retailers to communicate with customers via live video.",
	icon: "Plaza.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "plaza:dom:0",
			kind: "dom",
			selector: "iframe[src*='stream.useplaza.com/']",
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
