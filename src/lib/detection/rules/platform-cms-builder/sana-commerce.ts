import type { TechnologyDefinition } from '../../types';

export const sanaCommerceTechnologyDefinition = {
	id: "sana-commerce",
	name: "Sana Commerce",
	website: "https://www.sana-commerce.com",
	description: "Sana Commerce is an ecommerce platform for SAP and Microsoft Dynamics.",
	icon: "Sana Commerce.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sana-commerce:jsGlobal:0",
			kind: "jsGlobal",
			property: "Sana.UI",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
