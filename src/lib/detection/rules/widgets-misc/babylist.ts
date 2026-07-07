import type { TechnologyDefinition } from '../../types';

export const babylistTechnologyDefinition = {
	id: "babylist",
	name: "Babylist",
	website: "https://www.babylist.com",
	description: "Babylist is a universal wish list.",
	icon: "Babylist.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "babylist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("babylist\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
