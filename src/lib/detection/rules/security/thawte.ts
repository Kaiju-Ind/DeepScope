import type { TechnologyDefinition } from '../../types';

export const thawteTechnologyDefinition = {
	id: "thawte",
	name: "Thawte",
	website: "https://www.thawte.com",
	description: "Thawte is a provider of SSL certificates, offering a site seal as a visual indicator of website security.",
	icon: "Thawte.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "thawte:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("Thawte"),
			description: "Certificate issuer matches a known technology marker.",
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
