import type { TechnologyDefinition } from '../../types';

export const enduroJsTechnologyDefinition = {
	id: "enduro-js",
	name: "enduro.js",
	website: "https://endurojs.com",
	icon: "enduro.js.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "enduro-js:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^enduro\\.js", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "enduro-js:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^enduro\\.js", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
