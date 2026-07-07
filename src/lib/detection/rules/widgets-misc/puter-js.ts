import type { TechnologyDefinition } from '../../types';

export const puterJsTechnologyDefinition = {
	id: "puter-js",
	name: "Puter.js",
	website: "https://docs.puter.com",
	description: "Puter.js is a JavaScript library that provides serverless authentication, cloud services, and AI capabilities directly in the browser without requiring backend code or configuration.",
	icon: "PuterJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "puter-js:jsGlobal:0",
			kind: "jsGlobal",
			property: "puter.APIOrigin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "puter-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "puter_gui_enabled",
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
