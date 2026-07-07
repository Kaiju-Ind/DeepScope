import type { TechnologyDefinition } from '../../types';

export const adobeAudienceManagerTechnologyDefinition = {
	id: "adobe-audience-manager",
	name: "Adobe Audience Manager",
	website: "https://business.adobe.com/products/audience-manager/adobe-audience-manager.html",
	description: "Adobe Audience Manager is a versatile audience data management platform.",
	icon: "Adobe.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "adobe-audience-manager:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^Demdex$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adobe-audience-manager:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^aam_uuid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "adobe-audience-manager:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^demdex$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
