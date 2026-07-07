import type { TechnologyDefinition } from '../../types';

export const croboxTechnologyDefinition = {
	id: "crobox",
	name: "Crobox",
	website: "https://crobox.com/",
	icon: "Crobox.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "crobox:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.crobox\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "crobox:jsGlobal:1",
			kind: "jsGlobal",
			property: "crobox",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
