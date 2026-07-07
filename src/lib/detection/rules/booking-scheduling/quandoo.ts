import type { TechnologyDefinition } from '../../types';

export const quandooTechnologyDefinition = {
	id: "quandoo",
	name: "Quandoo",
	website: "https://www.quandoo.co.uk",
	description: "Quandoo is a platform that allows users to find and reserve restaurants.",
	icon: "Quandoo.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "quandoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("booking-widget\\.quandoo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
