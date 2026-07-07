import type { TechnologyDefinition } from '../../types';

export const paydockTechnologyDefinition = {
	id: "paydock",
	name: "Paydock",
	website: "https://paydock.com",
	description: "Paydock is a tool for managing payments and transactions across multiple platforms.",
	icon: "Paydock.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "paydock:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.paydock\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "paydock:dom:1",
			kind: "dom",
			selector: "link[href*='app-sandbox.paydock.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
