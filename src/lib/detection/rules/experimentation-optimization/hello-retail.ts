import type { TechnologyDefinition } from '../../types';

export const helloRetailTechnologyDefinition = {
	id: "hello-retail",
	name: "Hello Retail",
	website: "https://helloretail.com",
	description: "Hello Retail is an AI-driven platform that delivers personalized product recommendations, intelligent search, and email solutions for ecommerce.",
	icon: "HelloRetail.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "hello-retail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/helloretailcdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hello-retail:jsGlobal:1",
			kind: "jsGlobal",
			property: "HELLO_RETAIL",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hello-retail:jsGlobal:2",
			kind: "jsGlobal",
			property: "HelloRetailSwiper",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
