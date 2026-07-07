import type { TechnologyDefinition } from '../../types';

export const enllaxTechnologyDefinition = {
	id: "enllax",
	name: "Enllax",
	website: "https://github.com/mmkjony/enllax.js",
	description: "Enllax.js is a JavaScript plugin that enables parallax scrolling effects by adjusting the position and speed of page elements relative to the scroll movement.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "enllax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.enllax\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
