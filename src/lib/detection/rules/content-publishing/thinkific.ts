import type { TechnologyDefinition } from '../../types';

export const thinkificTechnologyDefinition = {
	id: "thinkific",
	name: "Thinkific",
	website: "https://www.thinkific.com",
	description: "Thinkific is a software platform that enables entrepreneurs to create, market, sell, and deliver their own online courses.",
	icon: "Thinkific.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "thinkific:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn(?:-themes)?\\.thinkific\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "thinkific:jsGlobal:1",
			kind: "jsGlobal",
			property: "Thinkific",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thinkific:jsGlobal:2",
			kind: "jsGlobal",
			property: "ThinkificAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "thinkific:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_thinkific_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:thinkific:thinkific:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
