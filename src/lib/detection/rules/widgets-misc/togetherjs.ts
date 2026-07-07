import type { TechnologyDefinition } from '../../types';

export const togetherjsTechnologyDefinition = {
	id: "togetherjs",
	name: "TogetherJS",
	website: "https://togetherjs.com",
	description: "TogetherJS is an open-source JavaScript library by Mozilla that integrates collaboration tools and features into websites.",
	icon: "TogetherJS.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "togetherjs:jsGlobal:0",
			kind: "jsGlobal",
			property: "TogetherJS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "togetherjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "TogetherJSConfig_cloneClicks",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "togetherjs:jsGlobal:2",
			kind: "jsGlobal",
			property: "TogetherJSConfig_toolName",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
