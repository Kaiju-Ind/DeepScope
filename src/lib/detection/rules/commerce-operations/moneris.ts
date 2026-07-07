import type { TechnologyDefinition } from '../../types';

export const monerisTechnologyDefinition = {
	id: "moneris",
	name: "Moneris",
	website: "https://www.moneris.com",
	description: "Moneris (formerly Moneris Solutions) is Canada's largest financial technology company that specialises in payment processing.",
	icon: "Moneris.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "moneris:jsGlobal:0",
			kind: "jsGlobal",
			property: "initialServerData.monerisConfiguration",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "moneris:header:1",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.moneris\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
