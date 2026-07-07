import type { TechnologyDefinition } from '../../types';

export const a8NetTechnologyDefinition = {
	id: "a8-net",
	name: "A8.net",
	website: "https://www.a8.net",
	description: "A8.net is an affiliate marketing network.",
	icon: "A8.net.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "a8-net:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("statics\\.a8\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "a8-net:dom:1",
			kind: "dom",
			selector: "img[src*='.a8.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "a8-net:jsGlobal:2",
			kind: "jsGlobal",
			property: "A8salesCookieRepository",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a8-net:jsGlobal:3",
			kind: "jsGlobal",
			property: "a8sales",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "a8-net:jsGlobal:4",
			kind: "jsGlobal",
			property: "map_A8",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
