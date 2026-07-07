import type { TechnologyDefinition } from '../../types';

export const commerceVisionTechnologyDefinition = {
	id: "commerce-vision",
	name: "Commerce Vision",
	website: "https://www.commercevision.com.au",
	description: "Commerce Vision is a provider of enterprise-level B2B and B2C ecommerce solutions integrated with ERP applications.",
	icon: "CommerceVision.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "commerce-vision:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.commercevision\\.com\\.au", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "commerce-vision:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.commercevision\\.com\\.au", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
