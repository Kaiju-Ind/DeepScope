import type { TechnologyDefinition } from '../../types';

export const skitterTechnologyDefinition = {
	id: "skitter",
	name: "Skitter",
	website: "https://skitter-slider.net",
	description: "Skitter is a jQuery-based slider system.",
	icon: "Skitter.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "skitter:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.skitter\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
