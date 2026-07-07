import type { TechnologyDefinition } from '../../types';

export const wheelioTechnologyDefinition = {
	id: "wheelio",
	name: "Wheelio",
	website: "https://wheelio-app.com/",
	description: "Wheelio is gamified pop-up/widget for ecommerce sites.",
	icon: "Wheelio.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "wheelio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wheelioapp\\.azureedge\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
