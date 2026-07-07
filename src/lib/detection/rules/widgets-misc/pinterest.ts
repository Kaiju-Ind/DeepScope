import type { TechnologyDefinition } from '../../types';

export const pinterestTechnologyDefinition = {
	id: "pinterest",
	name: "Pinterest",
	website: "https://pinterest.com",
	description: "Pinterest is an image sharing and social media service designed to enable saving and discovery of information.",
	icon: "Pinterest.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pinterest:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/assets\\.pinterest\\.com\\/js\\/pinit\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
