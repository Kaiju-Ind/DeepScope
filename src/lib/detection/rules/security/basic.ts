import type { TechnologyDefinition } from '../../types';

export const basicTechnologyDefinition = {
	id: "basic",
	name: "Basic",
	website: "https://tools.ietf.org/html/rfc7617",
	description: "Basic is an authetication method used by some web servers.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "basic:header:0",
			kind: "header",
			key: "WWW-Authenticate",
			valuePattern: new RegExp("^Basic", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "basic:header:1",
			kind: "header",
			key: "www-authenticate",
			valuePattern: new RegExp("^basic", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
