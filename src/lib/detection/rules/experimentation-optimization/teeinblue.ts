import type { TechnologyDefinition } from '../../types';

export const teeinblueTechnologyDefinition = {
	id: "teeinblue",
	name: "Teeinblue",
	website: "https://teeinblue.com",
	description: "Teeinblue is a personalization tool tailored for print-on-demand merchants using Shopify.",
	icon: "TeeinBlue.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "teeinblue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sdk\\.teeinblue\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "teeinblue:jsGlobal:1",
			kind: "jsGlobal",
			property: "TEEINBLUE_LOADED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teeinblue:jsGlobal:2",
			kind: "jsGlobal",
			property: "teeinblue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "teeinblue:jsGlobal:3",
			kind: "jsGlobal",
			property: "teeinblueShop",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
