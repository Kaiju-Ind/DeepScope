import type { TechnologyDefinition } from '../../types';

export const makeSenseTechnologyDefinition = {
	id: "make-sense",
	name: "Make-Sense",
	website: "https://mk-sense.com/",
	icon: "Make-Sense.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "make-sense:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mk-sense\\.com\\/aweb\\?license"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
