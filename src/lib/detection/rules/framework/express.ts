import type { TechnologyDefinition } from '../../types';

export const expressTechnologyDefinition = {
	id: "express",
	name: "Express",
	website: "https://expressjs.com",
	description: "Express is a web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs.",
	icon: "Express.svg",
	categories: [
		"framework",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "express:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^Express(?:$|,)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "express:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^connect\\\\\\.sid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "express:header:2",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^express(?:$|,)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:expressjs:express:*:*:*:*:*:*:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
