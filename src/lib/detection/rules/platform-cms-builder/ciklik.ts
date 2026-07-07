import type { TechnologyDefinition } from '../../types';

export const ciklikTechnologyDefinition = {
	id: "ciklik",
	name: "Ciklik",
	website: "https://www.ciklik.co",
	description: "Ciklik is an ecommerce platform that empowers individuals to establish online stores and market their subscription-based products.",
	icon: "Ciklik.svg",
	categories: [
		"platform-cms-builder",
		"commerce-operations",
	],
	rules: [
		{
			id: "ciklik:jsGlobal:0",
			kind: "jsGlobal",
			property: "t_ciklik",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ciklik:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ciklik_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
