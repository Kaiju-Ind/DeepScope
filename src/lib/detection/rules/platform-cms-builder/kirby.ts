import type { TechnologyDefinition } from '../../types';

export const kirbyTechnologyDefinition = {
	id: "kirby",
	name: "Kirby",
	website: "https://getkirby.com",
	description: "Kirby is a file-based content management system (CMS) that simplifies website and web application development by using text files for content management instead of a traditional database.",
	icon: "Kirby.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kirby:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^kirby_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
		cpe: "cpe:2.3:a:getkirby:kirby:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
		"vue-js",
	],
} as const satisfies TechnologyDefinition;
