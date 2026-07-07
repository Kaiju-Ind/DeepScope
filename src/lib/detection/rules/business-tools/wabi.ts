import type { TechnologyDefinition } from '../../types';

export const wabiTechnologyDefinition = {
	id: "wabi",
	name: "Wabi",
	website: "https://wabi-app.com",
	description: "Wabi is a platform facilitating customer engagement through WhatsApp.",
	icon: "Wabi.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "wabi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wabi-app\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wabi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Wabi",
			description: "Page-owned global matches a known technology marker.",
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
