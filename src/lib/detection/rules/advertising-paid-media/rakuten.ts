import type { TechnologyDefinition } from '../../types';

export const rakutenTechnologyDefinition = {
	id: "rakuten",
	name: "Rakuten",
	website: "https://www.rakuten.com/",
	description: "Rakuten (formerly Ebates) allows you to earn cash-back rewards.",
	icon: "Rakuten.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "rakuten:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tag\\.rmp\\.rakuten\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rakuten:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.linksynergy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rakuten:jsGlobal:2",
			kind: "jsGlobal",
			property: "rakutenRanMID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rakuten:jsGlobal:3",
			kind: "jsGlobal",
			property: "rakutenSource",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "rakuten:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^rakuten\\-source$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
