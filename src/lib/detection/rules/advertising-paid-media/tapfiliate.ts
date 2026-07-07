import type { TechnologyDefinition } from '../../types';

export const tapfiliateTechnologyDefinition = {
	id: "tapfiliate",
	name: "Tapfiliate",
	website: "https://tapfiliate.com",
	description: "Tapfiliate is a cloud-based affiliate marketing software that helps businesses to create, track, and optimise their own affiliate marketing programs.",
	icon: "Tapfiliate.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tapfiliate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tapfiliate\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tapfiliate:jsGlobal:1",
			kind: "jsGlobal",
			property: "TapfiliateObject",
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
