import type { TechnologyDefinition } from '../../types';

export const storerocketTechnologyDefinition = {
	id: "storerocket",
	name: "StoreRocket",
	website: "https://storerocket.io",
	description: "StoreRocket is a fully customizable store locator for websites, requiring no coding skills.",
	icon: "StoreRocket.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "storerocket:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.storerocket\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "storerocket:jsGlobal:1",
			kind: "jsGlobal",
			property: "StoreRocket",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
