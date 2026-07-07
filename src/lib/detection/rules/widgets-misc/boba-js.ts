import type { TechnologyDefinition } from '../../types';

export const bobaJsTechnologyDefinition = {
	id: "boba-js",
	name: "Boba.js",
	website: "https://boba.space150.com",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "boba-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("boba(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"google-analytics",
	],
} as const satisfies TechnologyDefinition;
