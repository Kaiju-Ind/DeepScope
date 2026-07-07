import type { TechnologyDefinition } from '../../types';

export const cerosTechnologyDefinition = {
	id: "ceros",
	name: "Ceros",
	website: "https://www.ceros.com",
	description: "Ceros is an interactive, no-code content creation platform designed for marketers and designers to develop engaging digital experiences.",
	icon: "Ceros.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ceros:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ceros\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ceros:jsGlobal:1",
			kind: "jsGlobal",
			property: "CerosMath",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ceros:jsGlobal:2",
			kind: "jsGlobal",
			property: "CerosSDK",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ceros:jsGlobal:3",
			kind: "jsGlobal",
			property: "cerosContext",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
