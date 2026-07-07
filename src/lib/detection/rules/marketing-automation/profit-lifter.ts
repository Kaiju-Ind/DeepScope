import type { TechnologyDefinition } from '../../types';

export const profitLifterTechnologyDefinition = {
	id: "profit-lifter",
	name: "Profit Lifter",
	website: "https://profitlifter.com",
	description: "Profit Lifter is an AI-powered platform enabling automated website creation, sales funnels, and email campaigns designed to attract and convert leads into sales.",
	icon: "ProfitLifter.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "profit-lifter:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.profitlifter\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
