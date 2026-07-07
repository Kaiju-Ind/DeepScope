import type { TechnologyDefinition } from '../../types';

export const imagesloadedTechnologyDefinition = {
	id: "imagesloaded",
	name: "imagesLoaded",
	website: "https://imagesloaded.desandro.com/",
	description: "jQuery plugin for seeing if the images are loaded.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "imagesloaded:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("imagesloaded(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
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
