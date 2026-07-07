import type { TechnologyDefinition } from '../../types';

export const sellbeTechnologyDefinition = {
	id: "sellbe",
	name: "SellBe",
	website: "https://sellbe.com",
	description: "SellBe is a platform for creating online stores in Russia.",
	icon: "SellBe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sellbe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sellbe\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
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
