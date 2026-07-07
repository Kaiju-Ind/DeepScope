import type { TechnologyDefinition } from '../../types';

export const knocommerceTechnologyDefinition = {
	id: "knocommerce",
	name: "KnoCommerce",
	website: "https://knocommerce.com",
	description: "KnoCommerce is a post-purchase surveys system designed to collect customer feedback.",
	icon: "KnoCommerce.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "knocommerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.knocdn\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "knocommerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "Kno.survey",
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
