import type { TechnologyDefinition } from '../../types';

export const wegicTechnologyDefinition = {
	id: "wegic",
	name: "Wegic",
	website: "https://wegic.ai",
	description: "Wegic is a platform that utilizes artificial intelligence to automate website design, development, and management based on user input.",
	icon: "Wegic.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wegic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.wegic\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wegic:jsGlobal:1",
			kind: "jsGlobal",
			property: "WegicCollect",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wegic:jsGlobal:2",
			kind: "jsGlobal",
			property: "WegicElementInspector",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
