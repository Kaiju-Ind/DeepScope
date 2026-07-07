import type { TechnologyDefinition } from '../../types';

export const nodebbTechnologyDefinition = {
	id: "nodebb",
	name: "NodeBB",
	website: "https://nodebb.org",
	description: "NodeBB forum software is powered by Node.js and built on either a Redis or MongoDB database.",
	icon: "NodeBB.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "nodebb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/nodebb\\.min\\.js\\?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nodebb:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^NodeBB$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "nodebb:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^nodebb$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
		cpe: "cpe:2.3:a:nodebb:nodebb:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
