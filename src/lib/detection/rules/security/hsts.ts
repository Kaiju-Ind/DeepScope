import type { TechnologyDefinition } from '../../types';

export const hstsTechnologyDefinition = {
	id: "hsts",
	name: "HSTS",
	website: "https://www.rfc-editor.org/rfc/rfc6797#section-6.1",
	description: "HTTP Strict Transport Security (HSTS) informs browsers that the site should only be accessed using HTTPS.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "hsts:responseHeader:0",
			kind: "responseHeader",
			key: "strict-transport-security",
			valuePattern: new RegExp("(?:^|;)\\s*max-age\\s*=\\s*(?!0(?:\\D|$))\\d+", "i"),
			description: "Main document response includes a Strict-Transport-Security header with a non-zero max-age. HTTPS alone is not HSTS evidence.",
		},
	],
} as const satisfies TechnologyDefinition;
