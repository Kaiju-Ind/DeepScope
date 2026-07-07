import type { TechnologyDefinition } from '../../types';

export const webmercsTechnologyDefinition = {
	id: "webmercs",
	name: "Webmercs",
	website: "https://www.webmercs.com",
	description: "Webmercs is a platform that develops websites alongside integrated backend logistics and warehousing solutions for advanced customers operating in the B2C and B2B computer retail sector.",
	icon: "Webmercs.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webmercs:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Webmercs$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
