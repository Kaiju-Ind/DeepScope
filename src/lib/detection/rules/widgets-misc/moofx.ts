import type { TechnologyDefinition } from '../../types';

export const moofxTechnologyDefinition = {
	id: "moofx",
	name: "Moofx",
	website: "https://github.com/kamicane/moofx",
	description: "Moofx is a CSS3-enabled JavaScript animation library for creating and managing lightweight, hardware-accelerated animations.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "moofx:jsGlobal:0",
			kind: "jsGlobal",
			property: "moofx.parse",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
