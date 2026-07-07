import type { TechnologyDefinition } from '../../types';

export const spnegoTechnologyDefinition = {
	id: "spnego",
	name: "SPNEGO",
	website: "https://tools.ietf.org/html/rfc4559",
	description: "SPNEGO is an authentication method commonly used in Windows servers to allow NTLM or Kerberos authentication.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "spnego:header:0",
			kind: "header",
			key: "WWW-Authenticate",
			valuePattern: new RegExp("^Negotiate", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "spnego:header:1",
			kind: "header",
			key: "www-authenticate",
			valuePattern: new RegExp("^negotiate", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
