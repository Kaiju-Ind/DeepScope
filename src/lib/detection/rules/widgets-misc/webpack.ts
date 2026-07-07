import type { TechnologyDefinition } from '../../types';

export const webpackTechnologyDefinition = {
	id: "webpack",
	name: "Webpack",
	website: "https://webpack.js.org/",
	description: "Webpack is a JavaScript module bundler for web applications and assets.",
	icon: "Webpack.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "webpack:jsGlobal:0",
			kind: "jsGlobal",
			property: "webpackChunk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webpack:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
