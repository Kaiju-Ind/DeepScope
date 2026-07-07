import type { TechnologyDefinition } from '../../types';

export const tolstoyTechnologyDefinition = {
	id: "tolstoy",
	name: "Tolstoy",
	website: "https://www.gotolstoy.com",
	description: "Tolstoy is a video communication platform designed to automate workflows.",
	icon: "Tolstoy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "tolstoy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gotolstoy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tolstoy:jsGlobal:1",
			kind: "jsGlobal",
			property: "tolstoySettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tolstoy:jsGlobal:2",
			kind: "jsGlobal",
			property: "tolstoyWidget",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
