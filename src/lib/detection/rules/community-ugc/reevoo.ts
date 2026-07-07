import type { TechnologyDefinition } from '../../types';

export const reevooTechnologyDefinition = {
	id: "reevoo",
	name: "Reevoo",
	website: "https://www.reevoo.com",
	description: "Reevoo is a provider of UGC solutions like reviews.",
	icon: "Reevoo.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "reevoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reevoo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "reevoo:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReevooApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reevoo:jsGlobal:2",
			kind: "jsGlobal",
			property: "reevooAccessCode",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reevoo:jsGlobal:3",
			kind: "jsGlobal",
			property: "reevooLoader.tracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "reevoo:jsGlobal:4",
			kind: "jsGlobal",
			property: "reevooUrl",
			valuePattern: new RegExp("\\.reevoo\\.com\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
