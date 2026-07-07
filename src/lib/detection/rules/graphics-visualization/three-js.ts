import type { TechnologyDefinition } from '../../types';

export const threeJsTechnologyDefinition = {
	id: "three-js",
	name: "Three.js",
	website: "https://threejs.org",
	description: "Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.",
	icon: "Three.js.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "three-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("three(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "three-js:dom:1",
			kind: "dom",
			selector: "canvas[data-engine*='three.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "three-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "THREE.REVISION",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "three-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "__THREE__",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
