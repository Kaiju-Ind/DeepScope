import type { TechnologyDefinition } from '../../types';

export const mixitupTechnologyDefinition = {
	id: "mixitup",
	name: "Mixitup",
	website: "https://www.kunkalabs.com/mixitup/",
	description: "A CSS3 and jQuery Filter & Sort Plugin.",
	icon: "kunkalabs.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mixitup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mixitup(?:\\.min)?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
