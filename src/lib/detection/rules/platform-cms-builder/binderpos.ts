import type { TechnologyDefinition } from '../../types';

export const binderposTechnologyDefinition = {
	id: "binderpos",
	name: "BinderPOS",
	website: "https://www.binderpos.com",
	description: "Binder POS is an ecommerce platform designed for local game stores to manage inventories, automate pricing, and integrate with online marketplaces.",
	icon: "BinderPOS.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "binderpos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.binderpos\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "binderpos:jsGlobal:1",
			kind: "jsGlobal",
			property: "binderPOSBuylist",
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
