import type { TechnologyDefinition } from '../../types';

export const resimpliTechnologyDefinition = {
	id: "resimpli",
	name: "REsimpli",
	website: "https://resimpli.com",
	description: "REsimpli is a customer relationship management platform designed for real estate investors, providing integrated tools for managing sales, marketing, and business operations.",
	icon: "REsimpli.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "resimpli:jsGlobal:0",
			kind: "jsGlobal",
			property: "resimpli_iframe_stop_comman_callback",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
