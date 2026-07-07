import type { TechnologyDefinition } from '../../types';

export const booljsTechnologyDefinition = {
	id: "booljs",
	name: "Booljs",
	website: "https://booljs.com",
	description: "Booljs is a JavaScript framework for building web applications on the Bun runtime.",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "booljs:header:0",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("^Bool Typescript$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
