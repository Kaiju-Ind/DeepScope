import type { TechnologyDefinition } from '../../types';

export const ueeshopTechnologyDefinition = {
	id: "ueeshop",
	name: "Ueeshop",
	website: "https://www.ueeshop.com",
	description: "Ueeshop is an ecommerce platform from China.",
	icon: "Ueeshop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ueeshop:jsGlobal:0",
			kind: "jsGlobal",
			property: "ueeshop_config",
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
