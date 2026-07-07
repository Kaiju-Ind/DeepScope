import type { TechnologyDefinition } from '../../types';

export const sectigoTechnologyDefinition = {
	id: "sectigo",
	name: "Sectigo",
	website: "https://sectigo.com/",
	description: "Sectigo provides SSL certificate and computer security products.",
	icon: "Sectigo.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "sectigo:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("Sectigo"),
			description: "Certificate issuer matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
