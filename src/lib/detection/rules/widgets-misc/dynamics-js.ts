import type { TechnologyDefinition } from '../../types';

export const dynamicsJsTechnologyDefinition = {
	id: "dynamics-js",
	name: "Dynamics.js",
	website: "https://dynamicsjs.com",
	description: "Javascript library to create physics-related animations",
	icon: "Dynamics.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "dynamics-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("dynamics(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
