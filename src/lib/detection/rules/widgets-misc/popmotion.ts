import type { TechnologyDefinition } from '../../types';

export const popmotionTechnologyDefinition = {
	id: "popmotion",
	name: "Popmotion",
	website: "https://popmotion.io",
	description: "Popmotion is a collection of low-level JavaScript animation functions and utils for advanced animators.",
	icon: "Popmotion.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "popmotion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("popmotion\\.global\\.min\\.js(?:\\?ver=\\d+\\.\\d+)?"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "popmotion:jsGlobal:1",
			kind: "jsGlobal",
			property: "popmotion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
