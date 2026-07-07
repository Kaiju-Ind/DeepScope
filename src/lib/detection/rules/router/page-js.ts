import type { TechnologyDefinition } from '../../types';

export const pageJsTechnologyDefinition = {
	id: "page-js",
	name: "Page.js",
	website: "https://github.com/visionmedia/page.js",
	description: "Page.js is a micro client-side router designed to handle client-side routing within web applications.",
	categories: [
		"router",
		"developer-tooling",
	],
	rules: [
		{
			id: "page-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "page.Route",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
