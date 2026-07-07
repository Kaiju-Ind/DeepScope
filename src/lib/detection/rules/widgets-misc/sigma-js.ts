import type { TechnologyDefinition } from '../../types';

export const sigmaJsTechnologyDefinition = {
	id: "sigma-js",
	name: "Sigma.js",
	website: "https://www.sigmajs.org",
	description: "Sigma.js is a JavaScript library designed for visualizing large-scale graphs with thousands of nodes and edges.",
	icon: "SigmaJs.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "sigma-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/(static\\/js\\/|)sigma\\.min\\.js(?:\\?ver=([\\d\\.]+))?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sigma-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "sigma.canvas",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
