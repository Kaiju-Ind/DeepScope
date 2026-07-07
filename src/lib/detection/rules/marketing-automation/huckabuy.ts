import type { TechnologyDefinition } from '../../types';

export const huckabuyTechnologyDefinition = {
	id: "huckabuy",
	name: "Huckabuy",
	website: "https://huckabuy.com",
	description: "Huckabuy is a software product utilising Google's dynamic rendering and structured data initiatives to enhance organic channel growth.",
	icon: "Huckabuy.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "huckabuy:jsGlobal:0",
			kind: "jsGlobal",
			property: "HUCKABUY NAMESPACE.sd",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "huckabuy:jsGlobal:1",
			kind: "jsGlobal",
			property: "hbScriptRerun",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
