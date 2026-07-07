import type { TechnologyDefinition } from '../../types';

export const xzeroJsTechnologyDefinition = {
	id: "xzero-js",
	name: "Xzero JS",
	website: "https://xzerojs.org",
	description: "Xzero JS is a JavaScript library (ES6 module) for displaying 3D models, scenes and 360° panoramas on the web.",
	icon: "XzeroJS.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "xzero-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("xzero-js@([\\d.]+)\\/xzero\\.min\\.js.*"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
