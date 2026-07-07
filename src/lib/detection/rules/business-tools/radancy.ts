import type { TechnologyDefinition } from '../../types';

export const radancyTechnologyDefinition = {
	id: "radancy",
	name: "Radancy",
	website: "https://www.radancy.com",
	description: "Radancy is an online platform facilitating virtual hiring events and career fairs.",
	icon: "Radancy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "radancy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.brazenconnect\\.com\\/js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "radancy:jsGlobal:1",
			kind: "jsGlobal",
			property: "brazenTechnologies",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
