import type { TechnologyDefinition } from '../../types';

export const notieTechnologyDefinition = {
	id: "notie",
	name: "Notie",
	website: "https://github.com/jaredreich/notie",
	description: "Notie is a notification, input, and selection suite for javascript, with no dependencies.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "notie:jsGlobal:0",
			kind: "jsGlobal",
			property: "notie",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
