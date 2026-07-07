import type { TechnologyDefinition } from '../../types';

export const hantanaTechnologyDefinition = {
	id: "hantana",
	name: "hantana",
	website: "https://hantana.org/",
	description: "Hantana provides user behavior analysis tools like heatmaps, surveys, and feedback widgets to enhance website user experience and customer satisfaction.",
	icon: "hantana.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "hantana:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/hantana\\.org\\/widget"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hantana:jsGlobal:1",
			kind: "jsGlobal",
			property: "Hantana",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
