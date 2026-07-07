import type { TechnologyDefinition } from '../../types';

export const bownowTechnologyDefinition = {
	id: "bownow",
	name: "BowNow",
	website: "https://bow-now.jp",
	description: "BowNow is a marketing automation tool with business card management, sales support, analysis, and email magazine functions.",
	icon: "BowNow.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "bownow:jsGlobal:0",
			kind: "jsGlobal",
			property: "_bownow_ts",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bownow:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^bownow_act$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bownow:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^bownow_aid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bownow:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^bownow_cid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "bownow:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^bownow_mbid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
