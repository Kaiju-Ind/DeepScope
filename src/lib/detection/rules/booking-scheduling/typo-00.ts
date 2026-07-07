import type { TechnologyDefinition } from '../../types';

export const typo00TechnologyDefinition = {
	id: "typo-00",
	name: "Typo 00",
	website: "https://www.typo00.com",
	description: "Typo00 is a digital ordering system designed for restaurants to streamline order management.",
	icon: "Typo00.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "typo-00:dom:0",
			kind: "dom",
			selector: "link[href*='typo00-public.s3']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
