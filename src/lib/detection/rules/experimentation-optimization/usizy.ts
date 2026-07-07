import type { TechnologyDefinition } from '../../types';

export const usizyTechnologyDefinition = {
	id: "usizy",
	name: "Usizy",
	website: "https://usizy.com",
	description: "Usizy is the top size recommendation and prediction solution for ecommerce using machine learning, big data, and isomoprhic algorythms.",
	icon: "Usizy.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "usizy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.usizy\\.es\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "usizy:jsGlobal:1",
			kind: "jsGlobal",
			property: "uSizyUniversal",
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
