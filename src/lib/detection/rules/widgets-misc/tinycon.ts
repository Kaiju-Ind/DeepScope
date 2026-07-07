import type { TechnologyDefinition } from '../../types';

export const tinyconTechnologyDefinition = {
	id: "tinycon",
	name: "Tinycon",
	website: "https://github.com/tommoor/tinycon",
	description: "A library for manipulating a websites favicon.",
	categories: [
		"widgets-misc",
		"component-library",
	],
	rules: [
		{
			id: "tinycon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tinycon(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
