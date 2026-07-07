import type { TechnologyDefinition } from '../../types';

export const forteTechnologyDefinition = {
	id: "forte",
	name: "Forte",
	website: "https://www.forte.net",
	description: "Forte, a CSG Company offers merchants and partners a broad range of payment solutions.",
	icon: "Forte.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "forte:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("checkout\\.forte\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
