import type { TechnologyDefinition } from '../../types';

export const mulberryTechnologyDefinition = {
	id: "mulberry",
	name: "Mulberry",
	website: "https://www.getmulberry.com",
	description: "Mulberry is a developer of personalised product protection solutions used to help brands unlock additional revenue.",
	icon: "Mulberry.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "mulberry:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getmulberry\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mulberry:jsGlobal:1",
			kind: "jsGlobal",
			property: "mulberry.cta",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mulberry:jsGlobal:2",
			kind: "jsGlobal",
			property: "mulberryShop",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
