import type { TechnologyDefinition } from '../../types';

export const aimerceTechnologyDefinition = {
	id: "aimerce",
	name: "Aimerce",
	website: "https://www.aimerce.ai/",
	description: "Aimerce is an AI-powered, privacy-focused solution that utilises first-party data to support Shopify brands in a cookieless environment, enhancing data potential and increasing marketing revenue.",
	icon: "Aimerce.svg",
	categories: [
		"marketing-automation",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "aimerce:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.aimerce\\.ai\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aimerce:jsGlobal:1",
			kind: "jsGlobal",
			property: "AimerceAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
