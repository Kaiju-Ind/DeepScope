import type { TechnologyDefinition } from '../../types';

export const flexifunnelsTechnologyDefinition = {
	id: "flexifunnels",
	name: "FlexiFunnels",
	website: "https://flexifunnels.com",
	description: "FlexiFunnels is a platform for building high-converting sales funnels, generating leads, and selling products without requiring coding knowledge.",
	icon: "FlexiFunnels.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flexifunnels:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.flexifunnels\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
