import type { TechnologyDefinition } from '../../types';

export const goftinoTechnologyDefinition = {
	id: "goftino",
	name: "Goftino",
	website: "https://www.goftino.com",
	description: "Goftino is an online chat service for web users.",
	icon: "Goftino.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "goftino:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.goftino\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "goftino:jsGlobal:1",
			kind: "jsGlobal",
			property: "Goftino.setWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goftino:jsGlobal:2",
			kind: "jsGlobal",
			property: "goftinoRemoveLoad",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goftino:jsGlobal:3",
			kind: "jsGlobal",
			property: "goftino_1",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "goftino:jsGlobal:4",
			kind: "jsGlobal",
			property: "goftino_getUrl",
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
