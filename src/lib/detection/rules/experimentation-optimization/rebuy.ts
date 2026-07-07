import type { TechnologyDefinition } from '../../types';

export const rebuyTechnologyDefinition = {
	id: "rebuy",
	name: "Rebuy",
	website: "https://rebuyengine.com/",
	description: "Rebuy offers personlisation solutions for ecommerce sites.",
	icon: "Rebuy.png",
	categories: [
		"experimentation-optimization",
		"ecommerce-extensions",
	],
	rules: [
		{
			id: "rebuy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("rebuyengine\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "rebuy:jsGlobal:1",
			kind: "jsGlobal",
			property: "rebuyConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
	implies: [
		"cart-functionality",
	],
} as const satisfies TechnologyDefinition;
