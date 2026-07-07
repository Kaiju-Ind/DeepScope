import type { TechnologyDefinition } from '../../types';

export const wistiaTechnologyDefinition = {
	id: "wistia",
	name: "Wistia",
	website: "https://wistia.com",
	description: "Wistia is designed exclusively to serve companies using video on their websites for marketing, support, and sales.",
	icon: "Wistia.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "wistia:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wistia\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wistia:jsGlobal:1",
			kind: "jsGlobal",
			property: "Wistia",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wistia:jsGlobal:2",
			kind: "jsGlobal",
			property: "wistiaEmbeds",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wistia:jsGlobal:3",
			kind: "jsGlobal",
			property: "wistiaUtils",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
