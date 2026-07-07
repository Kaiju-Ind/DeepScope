import type { TechnologyDefinition } from '../../types';

export const babylonJsTechnologyDefinition = {
	id: "babylon-js",
	name: "Babylon.js",
	website: "https://www.babylonjs.com/",
	description: "Babylon.js is a real time 3D engine using a JavaScript library for displaying 3D graphics in a web browser via HTML5. The source code is available on GitHub and distributed under the Apache License 2.0.",
	icon: "babylonjs.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "babylon-js:dom:0",
			kind: "dom",
			selector: "canvas[data-engine*='Babylon.js']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "babylon-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "BABYLON.AddressMode",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
