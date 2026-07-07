import type { TechnologyDefinition } from '../../types';

export const digestTechnologyDefinition = {
	id: "digest",
	name: "Digest",
	website: "https://tools.ietf.org/html/rfc7616",
	description: "Digest is an authentication method based on a MD5 hash used by web servers.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "digest:header:0",
			kind: "header",
			key: "WWW-Authenticate",
			valuePattern: new RegExp("^Digest", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "digest:header:1",
			kind: "header",
			key: "www-authenticate",
			valuePattern: new RegExp("^digest", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
