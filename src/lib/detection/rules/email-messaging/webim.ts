import type { TechnologyDefinition } from '../../types';

export const webimTechnologyDefinition = {
	id: "webim",
	name: "Webim",
	website: "https://webim.ru",
	description: "Webim is a platform offering live chat service for website visitors, facilitating real-time communication between businesses and their online audience.",
	icon: "Webim.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "webim:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.webim\\.ru\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webim:jsGlobal:1",
			kind: "jsGlobal",
			property: "webim",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webim:jsGlobal:2",
			kind: "jsGlobal",
			property: "webim.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
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
