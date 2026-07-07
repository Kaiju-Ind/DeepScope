import type { TechnologyDefinition } from '../../types';

export const webreedTechnologyDefinition = {
	id: "webreed",
	name: "Webreed",
	website: "https://www.webreed.pet",
	description: "Webreed is a website-based tool designed for managing animal breeding processes.",
	icon: "Webreed.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webreed:jsGlobal:0",
			kind: "jsGlobal",
			property: "webreed.tel_view_url",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webreed:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^webreed_session$", "i"),
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
