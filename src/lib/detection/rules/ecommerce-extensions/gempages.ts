import type { TechnologyDefinition } from '../../types';

export const gempagesTechnologyDefinition = {
	id: "gempages",
	name: "GemPages",
	website: "https://gempages.net",
	description: "GemPages is a powerful Shopify landing page buidler that empowers SMEs, agency, and freelancers to build their brands and sell online.",
	icon: "GemPages.svg",
	categories: [
		"ecommerce-extensions",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gempages:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/files\\/gempagev\\d+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gempages:jsGlobal:1",
			kind: "jsGlobal",
			property: "GEMSTORE",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gempages:jsGlobal:2",
			kind: "jsGlobal",
			property: "GEMVENDOR",
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
