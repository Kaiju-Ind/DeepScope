import type { TechnologyDefinition } from '../../types';

export const nodeJsTechnologyDefinition = {
	id: "node-js",
	name: "Node.js",
	website: "https://nodejs.org",
	description: "Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside a web browser.",
	icon: "Node.js.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "node-js:dom:0",
			kind: "dom",
			selector: "div.appVersion i.icon-nodejs",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:nodejs:node.js:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
