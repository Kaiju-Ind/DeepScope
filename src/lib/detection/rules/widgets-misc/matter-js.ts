import type { TechnologyDefinition } from '../../types';

export const matterJsTechnologyDefinition = {
	id: "matter-js",
	name: "Matter.js",
	website: "https://brm.io/matter-js",
	description: "Matter.js is a JavaScript 2D rigid body physics engine for the web.",
	icon: "MatterJs.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "matter-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("matter(?:-wrap)?(?:\\/demo\\/js\\/lib(?:\\/matter-tools\\/jquery)?(?:\\/decomp)?)?(?:\\/?-?((?:\\d+\\.)+\\d+))?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "matter-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Matter.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "matter-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/matter\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
