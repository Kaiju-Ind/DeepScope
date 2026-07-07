import type { TechnologyDefinition } from '../../types';

export const infonlineTechnologyDefinition = {
	id: "infonline",
	name: "INFOnline",
	website: "https://www.infonline.de",
	icon: "INFOnline.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "infonline:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^https?:\\/\\/(?:[^/]+\\.)?i(?:oam|v)wbox\\.de\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "infonline:jsGlobal:1",
			kind: "jsGlobal",
			property: "iam_data",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "infonline:jsGlobal:2",
			kind: "jsGlobal",
			property: "szmvars",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
