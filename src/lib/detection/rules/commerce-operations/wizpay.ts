import type { TechnologyDefinition } from '../../types';

export const wizpayTechnologyDefinition = {
	id: "wizpay",
	name: "Wizpay",
	website: "https://www.wizpay.com.au",
	description: "Wizpay is a buy now pay later solution.",
	icon: "Wizpay.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "wizpay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/creditcorp-wizardpay\\/.+\\?ver=([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
