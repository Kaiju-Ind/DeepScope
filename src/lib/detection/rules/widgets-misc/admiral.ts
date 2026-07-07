import type { TechnologyDefinition } from '../../types';

export const admiralTechnologyDefinition = {
	id: "admiral",
	name: "Admiral",
	website: "https://www.getadmiral.com",
	description: "Admiral is a Visitor Relationship Management (VRM) platform.",
	icon: "Admiral.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "admiral:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("admiral(?:-engaged|:enabled)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "admiral:jsGlobal:1",
			kind: "jsGlobal",
			property: "admiral",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
