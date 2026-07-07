import type { TechnologyDefinition } from '../../types';

export const layupTechnologyDefinition = {
	id: "layup",
	name: "LayUp",
	website: "https://layup.co.za",
	description: "LayUp is a payment technology platform enabling customers to pay for goods and services over time.",
	icon: "LayUp.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "layup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("layup\\.co\\.za"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "layup:jsGlobal:1",
			kind: "jsGlobal",
			property: "LayUpCheckoutButton",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "layup:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\layup\\.co\\.za"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
