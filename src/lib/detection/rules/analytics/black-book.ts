import type { TechnologyDefinition } from '../../types';

export const blackBookTechnologyDefinition = {
	id: "black-book",
	name: "Black Book",
	website: "https://www.hearst.com/black-book",
	description: "Black Book is a provider of precise data and analytics for the automotive industry, offering market insights to support informed decision-making.",
	icon: "BlackBook.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "black-book:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.blackbookinformation\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "black-book:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.blackbookinformation\\.com"),
			description: "Script content contains a bounded technology signature.",
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
