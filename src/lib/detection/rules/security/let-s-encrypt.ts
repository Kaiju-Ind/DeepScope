import type { TechnologyDefinition } from '../../types';

export const letSEncryptTechnologyDefinition = {
	id: "let-s-encrypt",
	name: "Let's Encrypt",
	website: "https://letsencrypt.org/",
	description: "Let's Encrypt is a free, automated, and open certificate authority.",
	icon: "Lets Encrypt.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "let-s-encrypt:certIssuer:0",
			kind: "certIssuer",
			pattern: new RegExp("Let's Encrypt"),
			description: "Certificate issuer matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
