import type { TechnologyDefinition } from '../../types';

export const addtoanyTechnologyDefinition = {
	id: "addtoany",
	name: "AddToAny",
	website: "https://www.addtoany.com",
	description: "AddToAny is a universal sharing platform that can be integrated into a website by use of a web widget or plugin.",
	icon: "AddToAny.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "addtoany:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("addtoany\\.com\\/menu\\/page\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "addtoany:jsGlobal:1",
			kind: "jsGlobal",
			property: "a2apage_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
