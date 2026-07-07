import type { TechnologyDefinition } from '../../types';

export const ghostTechnologyDefinition = {
	id: "ghost",
	name: "Ghost",
	website: "https://ghost.org",
	description: "Ghost is a powerful app for new-media creators to publish, share, and grow a business around their content.",
	icon: "Ghost.svg",
	categories: [
		"platform-cms-builder",
		"content-publishing",
	],
	rules: [
		{
			id: "ghost:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Ghost(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ghost:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("ghost(?:\\s([\\d.]+))?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ghost:ghost:*:*:*:*:*:node.js:*:*",
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
