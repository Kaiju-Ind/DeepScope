import type { TechnologyDefinition } from '../../types';

export const candidTechnologyDefinition = {
	id: "candid",
	name: "Candid",
	website: "https://www.getcandid.com",
	description: "Candid is a visual commerce platform that integrates ecommerce with Instagram, enabling product discovery and streamlined shopping experiences.",
	icon: "Candid.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "candid:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.getcandid\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "candid:jsGlobal:1",
			kind: "jsGlobal",
			property: "candid.analytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
