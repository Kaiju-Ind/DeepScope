import type { TechnologyDefinition } from '../../types';

export const flipsiteTechnologyDefinition = {
	id: "flipsite",
	name: "Flipsite",
	website: "https://flipsite.io",
	description: "Flipsite is a platform for creating and managing websites.",
	icon: "Flipsite.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flipsite:meta:0",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^Made with Flipsite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "flipsite:meta:1",
			kind: "meta",
			key: "author",
			valuePattern: new RegExp("^made with flipsite$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
