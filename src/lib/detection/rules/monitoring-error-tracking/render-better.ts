import type { TechnologyDefinition } from '../../types';

export const renderBetterTechnologyDefinition = {
	id: "render-better",
	name: "Render Better",
	website: "https://www.renderbetter.com",
	description: "Render Better is automated site speed and core web vital optimisation platform for Shopify.",
	icon: "renderbetter.svg",
	categories: [
		"monitoring-error-tracking",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "render-better:jsGlobal:0",
			kind: "jsGlobal",
			property: "renderbetter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "render-better:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.renderbetter\\.app", "i"),
			recordType: "CNAME",
			description: "DNS record matches a known technology marker.",
		},
	],
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
