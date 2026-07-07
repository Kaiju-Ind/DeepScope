import type { TechnologyDefinition } from '../../types';

export const easystoreTechnologyDefinition = {
	id: "easystore",
	name: "EasyStore",
	website: "https://www.easystore.co",
	description: "EasyStore is a multi sales channel ecommerce platform.",
	icon: "EasyStore.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "easystore:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easystore\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easystore:jsGlobal:1",
			kind: "jsGlobal",
			property: "EasyStore",
			description: "Page-owned global matches a known technology marker.",
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
