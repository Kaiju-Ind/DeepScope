import type { TechnologyDefinition } from '../../types';

export const mooriTechnologyDefinition = {
	id: "moori",
	name: "Moori",
	website: "https://docs.moori.net",
	description: "Moori is a developer of Shopware 6 plugins, creating extensions that enhance functionality and customization within the ecommerce platform.",
	icon: "Moori.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "moori:dom:0",
			kind: "dom",
			selector: "link[href*='data.moori.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "moori:jsGlobal:1",
			kind: "jsGlobal",
			property: "moorlAnimation",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moori:jsGlobal:2",
			kind: "jsGlobal",
			property: "moorlFoundationModal",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
