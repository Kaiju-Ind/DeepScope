import type { TechnologyDefinition } from '../../types';

export const cludoTechnologyDefinition = {
	id: "cludo",
	name: "Cludo",
	website: "https://www.cludo.com",
	description: "Cludo is a site search platform with analytics and content optimization tools.",
	icon: "Cludo.svg",
	categories: [
		"search",
	],
	rules: [
		{
			id: "cludo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("customer\\.cludo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cludo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cludo.getPublicSettings",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cludo:jsGlobal:2",
			kind: "jsGlobal",
			property: "CludoSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "cludo:jsGlobal:3",
			kind: "jsGlobal",
			property: "CludoSearchInstances",
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
