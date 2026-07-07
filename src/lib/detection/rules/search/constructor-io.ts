import type { TechnologyDefinition } from '../../types';

export const constructorIoTechnologyDefinition = {
	id: "constructor-io",
	name: "Constructor.io",
	website: "https://constructor.io/",
	description: "Constructor.io is a site search and merchandising platform designed to help ecommerce.",
	icon: "ConstructorIO.png",
	categories: [
		"search",
	],
	rules: [
		{
			id: "constructor-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.cnstrc\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "constructor-io:jsGlobal:1",
			kind: "jsGlobal",
			property: "ConstructorioClient",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "constructor-io:jsGlobal:2",
			kind: "jsGlobal",
			property: "constructorio",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
