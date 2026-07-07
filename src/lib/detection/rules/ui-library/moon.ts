import type { TechnologyDefinition } from '../../types';

export const moonTechnologyDefinition = {
	id: "moon",
	name: "Moon",
	website: "https://kbrsh.github.io/moon/",
	icon: "moon.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "moon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/moon(?:\\.min)?\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
