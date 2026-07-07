import type { TechnologyDefinition } from '../../types';

export const koaTechnologyDefinition = {
	id: "koa",
	name: "Koa",
	website: "https://koajs.com",
	icon: "Koa.png",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "koa:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^koa$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "koa:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^koa$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:koajs:koa:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
