import type { TechnologyDefinition } from '../../types';

export const findberryTechnologyDefinition = {
	id: "findberry",
	name: "Findberry",
	website: "https://www.findberry.com",
	description: "Findberry is an internal site search service designed for web developers and site owners looking to integrate a professional, ad-free search engine into their websites.",
	icon: "Findberry.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "findberry:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.findberry\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "findberry:jsGlobal:1",
			kind: "jsGlobal",
			property: "jQuery_Findberry",
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
	requires: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
