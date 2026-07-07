import type { TechnologyDefinition } from '../../types';

export const searchspringTechnologyDefinition = {
	id: "searchspring",
	name: "Searchspring",
	website: "https://searchspring.com",
	description: "Searchspring is a site search and merchandising platform designed to help ecommerce.",
	icon: "Searchspring.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "searchspring:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.searchspring\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "searchspring:jsGlobal:1",
			kind: "jsGlobal",
			property: "SearchSpring",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "searchspring:jsGlobal:2",
			kind: "jsGlobal",
			property: "SearchSpringConf",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "searchspring:jsGlobal:3",
			kind: "jsGlobal",
			property: "SearchSpringInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
