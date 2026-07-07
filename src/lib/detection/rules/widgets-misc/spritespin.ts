import type { TechnologyDefinition } from '../../types';

export const spritespinTechnologyDefinition = {
	id: "spritespin",
	name: "SpriteSpin",
	website: "https://github.com/giniedp/spritespin",
	description: "SpriteSpin is a JavaScript plugin that enables users to create 360-degree image spin animations on their websites.",
	icon: "SprintHub.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "spritespin:jsGlobal:0",
			kind: "jsGlobal",
			property: "SpriteSpin",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
