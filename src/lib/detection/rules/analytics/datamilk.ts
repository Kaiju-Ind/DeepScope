import type { TechnologyDefinition } from '../../types';

export const datamilkTechnologyDefinition = {
	id: "datamilk",
	name: "DataMilk",
	website: "https://www.datamilk.ai",
	description: "DataMilk is an AI tool which autonomously optimises customer UI for ecommerce customers in order to increase conversions.",
	icon: "DataMilk.svg",
	categories: [
		"analytics",
		"widgets-misc",
	],
	rules: [
		{
			id: "datamilk:jsGlobal:0",
			kind: "jsGlobal",
			property: "datamilkMagicAiExecuted",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
