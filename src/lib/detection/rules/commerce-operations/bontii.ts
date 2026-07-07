import type { TechnologyDefinition } from '../../types';

export const bontiiTechnologyDefinition = {
	id: "bontii",
	name: "Bontii",
	website: "https://bontii.dk",
	description: "Bontii is a subscription module facilitating integration between webshop and payment solutions.",
	icon: "Bontii.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bontii:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.bontii\\.dk\\/"),
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
