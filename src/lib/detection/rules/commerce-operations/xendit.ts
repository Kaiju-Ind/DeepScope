import type { TechnologyDefinition } from '../../types';

export const xenditTechnologyDefinition = {
	id: "xendit",
	name: "Xendit",
	website: "https://www.xendit.co",
	description: "Xendit is a payment gateway in Indonesia and Southeast Asia.",
	icon: "Xendit.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "xendit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.xendit\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "xendit:jsGlobal:1",
			kind: "jsGlobal",
			property: "Xendit.card",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
