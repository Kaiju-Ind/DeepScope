import type { TechnologyDefinition } from '../../types';

export const ableCdpTechnologyDefinition = {
	id: "able-cdp",
	name: "Able CDP",
	website: "https://www.ablecdp.com",
	description: "Able CDP is a customer journey tracking system that monitors and analyzes user interactions across multiple touchpoints to provide insights into engagement and behavior.",
	icon: "AbleCDP.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "able-cdp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.ablecdp\\.com"),
			description: "Script source URL matches a known technology marker.",
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
