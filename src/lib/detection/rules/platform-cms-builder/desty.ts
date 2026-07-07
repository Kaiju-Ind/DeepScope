import type { TechnologyDefinition } from '../../types';

export const destyTechnologyDefinition = {
	id: "desty",
	name: "Desty",
	website: "https://www.desty.app",
	description: "Desty is a platform offering product and order management services, enabling handling of inventory, orders, and related processes for businesses.",
	icon: "Desty.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "desty:jsGlobal:0",
			kind: "jsGlobal",
			property: "DestyBp",
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
