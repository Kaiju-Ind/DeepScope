import type { TechnologyDefinition } from '../../types';

export const peekTechnologyDefinition = {
	id: "peek",
	name: "Peek",
	website: "https://www.peek.com/",
	description: "Peek is an online booking system for tour and activity providers.",
	icon: "Peek.svg",
	categories: [
		"widgets-misc",
		"booking-scheduling",
	],
	rules: [
		{
			id: "peek:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.peek\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "peek:jsGlobal:1",
			kind: "jsGlobal",
			property: "Peek",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "peek:jsGlobal:2",
			kind: "jsGlobal",
			property: "PeekJsApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "peek:jsGlobal:3",
			kind: "jsGlobal",
			property: "_peekConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
