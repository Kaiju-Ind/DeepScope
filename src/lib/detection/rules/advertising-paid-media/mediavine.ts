import type { TechnologyDefinition } from '../../types';

export const mediavineTechnologyDefinition = {
	id: "mediavine",
	name: "Mediavine",
	website: "https://www.mediavine.com",
	description: "Mediavine is a full service ad management platform.",
	icon: "Mediavine.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "mediavine:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.mediavine\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mediavine:jsGlobal:1",
			kind: "jsGlobal",
			property: "$mediavine.web",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mediavine:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^mediavine_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
