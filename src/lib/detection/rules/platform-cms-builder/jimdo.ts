import type { TechnologyDefinition } from '../../types';

export const jimdoTechnologyDefinition = {
	id: "jimdo",
	name: "Jimdo",
	website: "https://www.jimdo.com",
	description: "Jimdo is a website-builder and all-in-one hosting solution, designed to enable users to build their own websites.",
	icon: "Jimdo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "jimdo:url:0",
			kind: "url",
			pattern: new RegExp("\\.jimdo(?:site)?\\.com\\/"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "jimdo:jsGlobal:1",
			kind: "jsGlobal",
			property: "jimdoDolphinData",
			description: "Page-owned global matches a known technology marker.",
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
