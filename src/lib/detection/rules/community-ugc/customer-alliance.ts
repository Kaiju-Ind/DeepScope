import type { TechnologyDefinition } from '../../types';

export const customerAllianceTechnologyDefinition = {
	id: "customer-alliance",
	name: "Customer Alliance",
	website: "https://www.customer-alliance.com",
	description: "Customer Alliance is a cloud-based platform facilitating customer reviews and feedback management and analysis.",
	icon: "CustomerAlliance.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "customer-alliance:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.customer-alliance\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
