import type { TechnologyDefinition } from '../../types';

export const seoantTechnologyDefinition = {
	id: "seoant",
	name: "SEOAnt",
	website: "https://www.seoant.com",
	description: "SEOAnt is a SEO customization service that provides professional improvement suggestions, aimed at enhancing Google rankings and increasing conversions.",
	icon: "SEOAnt.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "seoant:jsGlobal:0",
			kind: "jsGlobal",
			property: "BlackUrlArray_SEOAnt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "seoant:jsGlobal:1",
			kind: "jsGlobal",
			property: "SEOAnt_toConsumableArray",
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
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
