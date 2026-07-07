import type { TechnologyDefinition } from '../../types';

export const cocos2dTechnologyDefinition = {
	id: "cocos2d",
	name: "Cocos2d",
	website: "https://www.cocos.com/en/cocos2dx",
	description: "Cocos2d is a mature open source cross-platform game development framework.",
	icon: "Cocos2d.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "cocos2d:jsGlobal:0",
			kind: "jsGlobal",
			property: "CocosEngine",
			valuePattern: new RegExp("([\\d\\.]{2,})"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
