import type { TechnologyDefinition } from '../../types';

export const digicertTechnologyDefinition = {
	id: "digicert",
	name: "DigiCert",
	website: "https://www.digicert.com/",
	icon: "DigiCert.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "digicert:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("DigiCert"),
			description: "Certificate issuer matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
