import type { TechnologyDefinition } from '../../types';

export const verisignTechnologyDefinition = {
	id: "verisign",
	name: "Verisign",
	website: "https://www.verisign.com",
	description: "Verisign is a provider of internet infrastructure services, known for its secure domain name registry.",
	icon: "Verisign.svg",
	categories: [
		"domain-parking",
	],
	rules: [
		{
			id: "verisign:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("seal\\.verisign\\.com\\/"),
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
