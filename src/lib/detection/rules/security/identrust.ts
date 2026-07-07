import type { TechnologyDefinition } from '../../types';

export const identrustTechnologyDefinition = {
	id: "identrust",
	name: "Identrust",
	website: "https://www.identrust.com/",
	description: "denTrust is a digital identity authentication solution.",
	icon: "Identrust.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "identrust:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("TrustID"),
			description: "Certificate issuer matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
