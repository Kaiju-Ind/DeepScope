import type { TechnologyDefinition } from '../../types';

export const arborJsTechnologyDefinition = {
	id: "arbor-js",
	name: "Arbor.js",
	website: "https://arborjs.org",
	description: "Arbor.js is a graph visualization library that uses web workers for performance and relies on jQuery for DOM manipulation and interaction.",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "arbor-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "arbor",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
