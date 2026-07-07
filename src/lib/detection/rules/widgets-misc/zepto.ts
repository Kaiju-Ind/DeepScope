import type { TechnologyDefinition } from '../../types';

export const zeptoTechnologyDefinition = {
	id: "zepto",
	name: "Zepto",
	website: "https://zeptojs.com",
	icon: "Zepto.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "zepto:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zepto.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "zepto:jsGlobal:1",
			kind: "jsGlobal",
			property: "Zepto",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
