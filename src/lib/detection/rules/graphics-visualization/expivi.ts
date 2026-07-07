import type { TechnologyDefinition } from '../../types';

export const expiviTechnologyDefinition = {
	id: "expivi",
	name: "Expivi",
	website: "https://www.expivi.com",
	description: "Expivi specialises in 3D visualisation technology for ecommerce stores.",
	icon: "Expivi.svg",
	categories: [
		"graphics-visualization",
	],
	rules: [
		{
			id: "expivi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.expivi\\.(?:com|net)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "expivi:dom:1",
			kind: "dom",
			selector: "iframe[src*='.expivi.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "expivi:jsGlobal:2",
			kind: "jsGlobal",
			property: "ExpiviComponent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "expivi:jsGlobal:3",
			kind: "jsGlobal",
			property: "expivi",
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
