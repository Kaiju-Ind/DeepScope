import type { TechnologyDefinition } from '../../types';

export const bvalidatorTechnologyDefinition = {
	id: "bvalidator",
	name: "bValidator",
	website: "https://code.google.com/archive/p/bvalidator",
	description: "bValidator is a jQuery plug-in for client side form validation.",
	icon: "bValidator.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "bvalidator:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.bvalidator\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "bvalidator:jsGlobal:1",
			kind: "jsGlobal",
			property: "bValidator",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
