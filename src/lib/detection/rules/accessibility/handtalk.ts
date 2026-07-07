import type { TechnologyDefinition } from '../../types';

export const handtalkTechnologyDefinition = {
	id: "handtalk",
	name: "Handtalk",
	website: "https://www.handtalk.me/",
	description: "Handtalk is an accessiblity plug-in which uses sign language to make sites accessible.",
	icon: "Handtalk.png",
	categories: [
		"accessibility",
	],
	rules: [
		{
			id: "handtalk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.handtalk\\.me"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "handtalk:jsGlobal:1",
			kind: "jsGlobal",
			property: "HandTalk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
