import type { TechnologyDefinition } from '../../types';

export const totalJsTechnologyDefinition = {
	id: "total-js",
	name: "total.js",
	website: "https://totaljs.com",
	description: "Total.js is a versatile platform offering open-source JavaScript/Node.js libraries and tools for both server-side and client-side web development.",
	icon: "total.js.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "total-js:header:0",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^total\\.js", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "total-js:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^total\\.js", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:totaljs:total.js:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
