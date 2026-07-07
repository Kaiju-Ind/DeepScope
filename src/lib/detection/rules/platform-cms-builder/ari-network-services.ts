import type { TechnologyDefinition } from '../../types';

export const ariNetworkServicesTechnologyDefinition = {
	id: "ari-network-services",
	name: "ARI Network Services",
	website: "https://arinet.com",
	description: "ARI Network Services provides website, software, and data solutions to help dealers, distributors, and OEMs improve their selling process.",
	icon: "ARI Network Services.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ari-network-services:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ari-secure\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
