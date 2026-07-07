import type { TechnologyDefinition } from '../../types';

export const e107TechnologyDefinition = {
	id: "e107",
	name: "e107",
	website: "https://e107.org",
	description: "e107 is an open-source content management system written in PHP.",
	icon: "e107.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "e107:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("[^a-z\\d]e107\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "e107:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^e107_tz$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "e107:header:2",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("e107", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "e107:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("e107", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:e107:e107:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
