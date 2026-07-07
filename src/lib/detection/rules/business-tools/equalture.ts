import type { TechnologyDefinition } from '../../types';

export const equaltureTechnologyDefinition = {
	id: "equalture",
	name: "Equalture",
	website: "https://www.equalture.com",
	description: "Equalture is a product that applies neuroscience-based methods to support hiring processes by assessing candidate behavior and decision-making to inform recruitment outcomes.",
	icon: "Equalture.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "equalture:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.equalture\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
