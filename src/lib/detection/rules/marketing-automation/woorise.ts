import type { TechnologyDefinition } from '../../types';

export const wooriseTechnologyDefinition = {
	id: "woorise",
	name: "Woorise",
	website: "https://woorise.com",
	description: "Woorise is a marketing platform that enables the creation of lead generation landing pages.",
	icon: "Woorise.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "woorise:dom:0",
			kind: "dom",
			selector: "script#woorise-embed-js-after",
			description: "DOM selector matches a known technology marker.",
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
