import type { TechnologyDefinition } from '../../types';

export const salesforceAudienceStudioTechnologyDefinition = {
	id: "salesforce-audience-studio",
	name: "Salesforce Audience Studio",
	website: "https://www.salesforce.com/products/marketing-cloud/data-management",
	description: "Salesforce Audience Studio is a customer data marketplace that only other platform users can access.",
	icon: "Salesforce.svg",
	categories: [
		"experimentation-optimization",
		"marketing-automation",
	],
	rules: [
		{
			id: "salesforce-audience-studio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.krxd\\.net\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salesforce-audience-studio:dom:1",
			kind: "dom",
			selector: "link[href*='.krxd.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "salesforce-audience-studio:jsGlobal:2",
			kind: "jsGlobal",
			property: "Krux",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "salesforce-audience-studio:jsGlobal:3",
			kind: "jsGlobal",
			property: "updateKruxCookie",
			description: "Page-owned global matches a known technology marker.",
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
