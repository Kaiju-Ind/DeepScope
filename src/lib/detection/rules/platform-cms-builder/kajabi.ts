import type { TechnologyDefinition } from '../../types';

export const kajabiTechnologyDefinition = {
	id: "kajabi",
	name: "Kajabi",
	website: "https://kajabi.com",
	icon: "Kajabi.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "kajabi:jsGlobal:0",
			kind: "jsGlobal",
			property: "Kajabi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "kajabi:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^_kjb_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
		],
	},
} as const satisfies TechnologyDefinition;
