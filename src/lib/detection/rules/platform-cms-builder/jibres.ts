import type { TechnologyDefinition } from '../../types';

export const jibresTechnologyDefinition = {
	id: "jibres",
	name: "Jibres",
	website: "https://jibres.com",
	description: "Jibres is an ecommerce solution with an online store builder and Point-of-Sale (PoS) software.",
	icon: "Jibres.svg",
	categories: [
		"platform-cms-builder",
		"business-tools",
	],
	rules: [
		{
			id: "jibres:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jibres\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jibres:jsGlobal:1",
			kind: "jsGlobal",
			property: "jibres",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jibres:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^jibres$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "jibres:header:3",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Jibres", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jibres:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Jibres", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "jibres:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("jibres", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "jibres:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("jibres", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
