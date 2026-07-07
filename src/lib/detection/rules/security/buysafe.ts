import type { TechnologyDefinition } from '../../types';

export const buysafeTechnologyDefinition = {
	id: "buysafe",
	name: "BuySafe",
	website: "https://www.buysafe.com",
	description: "BuySafe is a website seal that signifies adherence to stringent safety standards, ensuring secure online transactions and safeguarding user data.",
	icon: "BuySafe.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "buysafe:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("seal\\.buysafe\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "buysafe:jsGlobal:1",
			kind: "jsGlobal",
			property: "buySAFE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
