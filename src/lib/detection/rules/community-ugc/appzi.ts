import type { TechnologyDefinition } from '../../types';

export const appziTechnologyDefinition = {
	id: "appzi",
	name: "Appzi",
	website: "https://www.appzi.com",
	description: "Appzi is a customer experience software that is a user feedback and bug reporting tool.",
	icon: "Appzi.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "appzi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.appzi\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appzi:jsGlobal:1",
			kind: "jsGlobal",
			property: "appzi.At",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appzi:jsGlobal:2",
			kind: "jsGlobal",
			property: "appziSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appzi:jsGlobal:3",
			kind: "jsGlobal",
			property: "apzbtgtr",
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
