import type { TechnologyDefinition } from '../../types';

export const profityTechnologyDefinition = {
	id: "profity",
	name: "Profity",
	website: "https://www.profity.online",
	description: "Profity is a network of ecommerce companies that enables partner shops to market their offers to customers after a sale in any shop, enhancing mutual benefits and sales opportunities.",
	icon: "Profity.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "profity:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.profity\\.ch\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
