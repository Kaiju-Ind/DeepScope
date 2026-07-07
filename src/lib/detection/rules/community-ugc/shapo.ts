import type { TechnologyDefinition } from '../../types';

export const shapoTechnologyDefinition = {
	id: "shapo",
	name: "Shapo",
	website: "https://shapo.io/",
	description: "Shapo is a platform that simplifies the collection, management, and visualization of customer testimonials.",
	icon: "Shapo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "shapo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.shapo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "shapo:jsGlobal:1",
			kind: "jsGlobal",
			property: "_shapoLoaded",
			description: "Page-owned global matches a known technology marker.",
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
