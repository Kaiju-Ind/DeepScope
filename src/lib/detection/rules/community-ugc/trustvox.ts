import type { TechnologyDefinition } from '../../types';

export const trustvoxTechnologyDefinition = {
	id: "trustvox",
	name: "Trustvox",
	website: "https://site.trustvox.com.br",
	description: "Trustvox collects reviews from customers who purchased ecommerce products and publishes them on product pages with Sincerity Seals.",
	icon: "Trustvox.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "trustvox:jsGlobal:0",
			kind: "jsGlobal",
			property: "TrustvoxCertificateWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustvox:jsGlobal:1",
			kind: "jsGlobal",
			property: "TrustvoxRatesWidget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustvox:jsGlobal:2",
			kind: "jsGlobal",
			property: "_trustvox",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustvox:jsGlobal:3",
			kind: "jsGlobal",
			property: "_trustvox_colt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustvox:jsGlobal:4",
			kind: "jsGlobal",
			property: "_trustvox_shelf_rate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "trustvox:jsGlobal:5",
			kind: "jsGlobal",
			property: "trustvox_id",
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
