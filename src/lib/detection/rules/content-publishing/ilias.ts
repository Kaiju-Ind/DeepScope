import type { TechnologyDefinition } from '../../types';

export const iliasTechnologyDefinition = {
	id: "ilias",
	name: "Ilias",
	website: "https://www.ilias.de",
	description: "Ilias is an open source learning management system.",
	icon: "Ilias.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "ilias:jsGlobal:0",
			kind: "jsGlobal",
			property: "il.Accordion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ilias:jsGlobal:1",
			kind: "jsGlobal",
			property: "ilAccordionsInits",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ilias:jsGlobal:2",
			kind: "jsGlobal",
			property: "ilTagging",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:ilias:ilias:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
