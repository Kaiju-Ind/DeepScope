import type { TechnologyDefinition } from '../../types';

export const monobillTechnologyDefinition = {
	id: "monobill",
	name: "MonoBill",
	website: "https://monobill.com",
	description: "MonoBill is an ecommerce platform that offers built-in billing, subscription management, and payment processing features for small businesses.",
	icon: "MonoBill.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "monobill:jsGlobal:0",
			kind: "jsGlobal",
			property: "MONO.formatMoney",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "monobill:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^monobill_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
