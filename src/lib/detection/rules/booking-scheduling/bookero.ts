import type { TechnologyDefinition } from '../../types';

export const bookeroTechnologyDefinition = {
	id: "bookero",
	name: "Bookero",
	website: "https://www.bookero.org",
	description: "Bookero is online booking system for you website or Facebook page.",
	icon: "Bookero.svg",
	categories: [
		"booking-scheduling",
	],
	rules: [
		{
			id: "bookero:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.bookero\\.pl"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bookero:url:1",
			kind: "url",
			pattern: new RegExp("\\.bookero\\.(?:org|pl)"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "bookero:jsGlobal:2",
			kind: "jsGlobal",
			property: "bookero_config",
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
