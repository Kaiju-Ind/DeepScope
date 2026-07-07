import type { TechnologyDefinition } from '../../types';

export const adformTechnologyDefinition = {
	id: "adform",
	name: "Adform",
	website: "https://site.adform.com",
	description: "Adform is an all-in-one platform for digital advertising.",
	icon: "Adform.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "adform:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.adform\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adform:dom:1",
			kind: "dom",
			selector: "link[href*='.adformdsp.net'], link[href*='.adform.net']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
