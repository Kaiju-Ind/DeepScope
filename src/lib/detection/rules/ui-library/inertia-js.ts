import type { TechnologyDefinition } from '../../types';

export const inertiaJsTechnologyDefinition = {
	id: "inertia-js",
	name: "Inertia.js",
	website: "https://inertiajs.com",
	description: "Inertia.js is a protocol for creating monolithic single-page applications.",
	icon: "Inertia.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "inertia-js:dom:0",
			kind: "dom",
			selector: "div[data-page*='component']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "inertia-js:header:1",
			kind: "header",
			key: "Vary",
			valuePattern: new RegExp("X-Inertia", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "inertia-js:header:2",
			kind: "header",
			key: "vary",
			valuePattern: new RegExp("x-inertia", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
