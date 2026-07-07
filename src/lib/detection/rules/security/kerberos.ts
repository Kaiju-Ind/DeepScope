import type { TechnologyDefinition } from '../../types';

export const kerberosTechnologyDefinition = {
	id: "kerberos",
	name: "Kerberos",
	website: "https://tools.ietf.org/html/rfc4559",
	description: "Kerberos is an authentication method commonly used by Windows servers.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "kerberos:header:0",
			kind: "header",
			key: "WWW-Authenticate",
			valuePattern: new RegExp("^Kerberos", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "kerberos:header:1",
			kind: "header",
			key: "www-authenticate",
			valuePattern: new RegExp("^kerberos", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
