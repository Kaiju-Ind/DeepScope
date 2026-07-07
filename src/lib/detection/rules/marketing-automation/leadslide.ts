import type { TechnologyDefinition } from '../../types';

export const leadslideTechnologyDefinition = {
	id: "leadslide",
	name: "LeadSlide",
	website: "https://v1.leadslide.com",
	description: "LeadSlide is a marketing campaign software designed for wordpress, ecommerce, and Shopify.",
	icon: "LeadSlide.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadslide:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("leadslide\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadslide:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\leadslide\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
