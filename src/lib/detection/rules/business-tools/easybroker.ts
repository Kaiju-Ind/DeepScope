import type { TechnologyDefinition } from '../../types';

export const easybrokerTechnologyDefinition = {
	id: "easybroker",
	name: "EasyBroker",
	website: "https://www.easybroker.com",
	description: "EasyBroker is a property management platform facilitating sharing of properties through WhatsApp and email.",
	icon: "EasyBroker.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "easybroker:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easybroker\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
