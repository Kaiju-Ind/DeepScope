import type { TechnologyDefinition } from '../../types';

export const masonryTechnologyDefinition = {
	id: "masonry",
	name: "Masonry",
	website: "https://masonry.desandro.com",
	description: "Masonry is a JavaScript library that enables a cascading grid layout, positioning elements based on available vertical space for an optimized, gap-free arrangement.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "masonry:jsGlobal:0",
			kind: "jsGlobal",
			property: "Masonry.Item",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
