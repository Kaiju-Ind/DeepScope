import type { TechnologyDefinition } from '../../types';

export const customerIoTechnologyDefinition = {
	id: "customer-io",
	name: "Customer.io",
	website: "https://customer.io/",
	description: "Customer.io is a messaging automation platform for email, SMS, push, and in-app messages.",
	icon: "Customer.io.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "customer-io:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.customer\\.io"),
			description: "Script source URL matches a known technology marker.",
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
