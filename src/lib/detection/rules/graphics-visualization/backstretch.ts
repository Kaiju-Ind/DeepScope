import type { TechnologyDefinition } from '../../types';

export const backstretchTechnologyDefinition = {
	id: "backstretch",
	name: "Backstretch",
	website: "https://www.jquery-backstretch.com/",
	description: "A simple jQuery plugin that allows you to add a dynamically-resized, slideshow-capable background image to any page or element.",
	categories: [
		"graphics-visualization",
		"widgets-misc",
	],
	rules: [
		{
			id: "backstretch:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?(?:jquery\\.)?backstretch(?:\\.min)?\\.js"),
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
