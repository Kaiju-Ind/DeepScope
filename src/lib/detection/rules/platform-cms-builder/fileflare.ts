import type { TechnologyDefinition } from '../../types';

export const fileflareTechnologyDefinition = {
	id: "fileflare",
	name: "Fileflare",
	website: "https://digital-downloads.com",
	description: "Fileflare is a Shopify app that enables merchants to sell digital products by automatically delivering downloadable files to customers after purchase.",
	icon: "Fireflare.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fileflare:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.digital-downloads\\.com"),
			description: "Script content contains a bounded technology signature.",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
