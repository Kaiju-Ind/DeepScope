import type { TechnologyDefinition } from '../../types';

export const magistoTechnologyDefinition = {
	id: "magisto",
	name: "Magisto",
	website: "https://www.magisto.com",
	description: "Magisto is a video management solution designed to help marketing professionals, agencies, and businesses of all sizes.",
	icon: "Magisto.png",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "magisto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.magisto\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "magisto:jsGlobal:1",
			kind: "jsGlobal",
			property: "MagistoPlayerFrame",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "magisto:jsGlobal:2",
			kind: "jsGlobal",
			property: "magisto_server",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
