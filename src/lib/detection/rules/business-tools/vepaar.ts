import type { TechnologyDefinition } from '../../types';

export const vepaarTechnologyDefinition = {
	id: "vepaar",
	name: "Vepaar",
	website: "https://vepaar.com",
	description: "Vepaar is a software solution designed to help boost online businesses, providing features such as WhatsApp CRM, an online store, and a WhatsApp poll.",
	icon: "Vepaar.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "vepaar:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.vepaar\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
