import type { TechnologyDefinition } from '../../types';

export const vivvoTechnologyDefinition = {
	id: "vivvo",
	name: "VIVVO",
	website: "https://vivvo.net",
	icon: "VIVVO.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vivvo:jsGlobal:0",
			kind: "jsGlobal",
			property: "vivvo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vivvo:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^VivvoSessionId$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "vivvo:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^vivvosessionid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
