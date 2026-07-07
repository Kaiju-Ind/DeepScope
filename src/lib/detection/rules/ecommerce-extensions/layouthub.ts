import type { TechnologyDefinition } from '../../types';

export const layouthubTechnologyDefinition = {
	id: "layouthub",
	name: "LayoutHub",
	website: "https://layouthub.com",
	description: "LayoutHub is an easy page builder that helps merchants quickly set up an online store with any kind of page type by using our library of pre-designed layouts and blocks.",
	icon: "LayoutHub.png",
	categories: [
		"ecommerce-extensions",
		"platform-cms-builder",
	],
	rules: [
		{
			id: "layouthub:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.layouthub\\.com\\/shopify\\/layouthub\\.js"),
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
	implies: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
