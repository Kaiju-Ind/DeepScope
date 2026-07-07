import type { TechnologyDefinition } from '../../types';

export const fullbayTechnologyDefinition = {
	id: "fullbay",
	name: "Fullbay",
	website: "https://www.fullbay.com",
	description: "Fullbay is heavy-duty repair shop software that provides a clear view of ongoing activities in your repair shop while enhancing staff productivity.",
	icon: "Fullbay.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "fullbay:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.fullbay\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
