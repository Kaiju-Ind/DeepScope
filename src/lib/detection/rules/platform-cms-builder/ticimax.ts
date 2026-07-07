import type { TechnologyDefinition } from '../../types';

export const ticimaxTechnologyDefinition = {
	id: "ticimax",
	name: "Ticimax",
	website: "https://www.ticimax.com",
	description: "Ticimax provides ecommerce infrastructure services.",
	icon: "Ticimax.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ticimax:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ticimax\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ticimax:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ticimax\\.(?:com|cloud)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ticimax:jsGlobal:2",
			kind: "jsGlobal",
			property: "ticimaxApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ticimax:jsGlobal:3",
			kind: "jsGlobal",
			property: "ticimaxServices",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
