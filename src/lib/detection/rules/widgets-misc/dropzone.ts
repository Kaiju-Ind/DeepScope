import type { TechnologyDefinition } from '../../types';

export const dropzoneTechnologyDefinition = {
	id: "dropzone",
	name: "Dropzone",
	website: "https://www.dropzone.dev",
	description: "Dropzone is a JavaScript library that turns any HTML element into a dropzone.",
	icon: "Dropzone.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dropzone:jsGlobal:0",
			kind: "jsGlobal",
			property: "Dropzone",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dropzone:jsGlobal:1",
			kind: "jsGlobal",
			property: "Dropzone.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
