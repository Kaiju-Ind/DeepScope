import type { TechnologyDefinition } from '../../types';

export const smarterClickTechnologyDefinition = {
	id: "smarter-click",
	name: "Smarter Click",
	website: "https://smarterclick.com",
	description: "Smarter Click is a marketing technology company.",
	icon: "Smarter Click.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "smarter-click:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.?smct\\.(?:io|co)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smarter-click:jsGlobal:1",
			kind: "jsGlobal",
			property: "$smcInstall",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "smarter-click:jsGlobal:2",
			kind: "jsGlobal",
			property: "$smcT5",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "smarter-click:jsGlobal:3",
			kind: "jsGlobal",
			property: "$smctData",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
