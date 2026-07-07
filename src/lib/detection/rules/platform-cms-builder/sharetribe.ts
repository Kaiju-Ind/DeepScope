import type { TechnologyDefinition } from '../../types';

export const sharetribeTechnologyDefinition = {
	id: "sharetribe",
	name: "Sharetribe",
	website: "https://www.sharetribe.com",
	description: "Sharetribe is cloud-based platform for small to medium businesses, which helps businesses to create and manage custom online marketplaces.",
	icon: "Sharetribe.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sharetribe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sharetribe\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sharetribe:dom:1",
			kind: "dom",
			selector: "img[srcset*='sharetribe.imgix.net/'], img[src*='user-assets.sharetribe.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:sharetribe:sharetribe:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
