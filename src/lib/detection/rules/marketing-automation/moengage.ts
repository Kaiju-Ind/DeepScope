import type { TechnologyDefinition } from '../../types';

export const moengageTechnologyDefinition = {
	id: "moengage",
	name: "MoEngage",
	website: "https://www.moengage.com",
	description: "MoEngage is an intelligent customer engagement platform for the customer-obsessed marketer.",
	icon: "MoEngage.png",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "moengage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.moengage\\.\\w+"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moengage:jsGlobal:1",
			kind: "jsGlobal",
			property: "MOENGAGE_API_KEY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moengage:jsGlobal:2",
			kind: "jsGlobal",
			property: "Moengage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moengage:jsGlobal:3",
			kind: "jsGlobal",
			property: "downloadMoengage",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moengage:jsGlobal:4",
			kind: "jsGlobal",
			property: "moengage_object",
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
