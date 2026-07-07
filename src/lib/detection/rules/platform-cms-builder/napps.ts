import type { TechnologyDefinition } from '../../types';

export const nappsTechnologyDefinition = {
	id: "napps",
	name: "Napps",
	website: "https://napps.io",
	description: "Napps is a platform that allows businesses to convert their Shopify and WooCommerce online stores into mobile apps without any coding.",
	icon: "Napps.svg",
	categories: [
		"platform-cms-builder",
		"mobile",
	],
	rules: [
		{
			id: "napps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/napps-storage\\.b-cdn\\.net\\/scripts\\/smartbanner\\.js\\?napps=1"),
			description: "Script source URL matches a known technology marker.",
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
