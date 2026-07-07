import type { TechnologyDefinition } from '../../types';

export const sailsJsTechnologyDefinition = {
	id: "sails-js",
	name: "Sails.js",
	website: "https://sailsjs.org",
	icon: "Sails.js.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "sails-js:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^sails\\.sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sails-js:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Sails(?:$|[^a-z0-9])", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sails-js:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^sails\\\\\\.sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "sails-js:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^sails(?:$|[^a-z0-9])", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"express",
	],
} as const satisfies TechnologyDefinition;
