import type { TechnologyDefinition } from '../../types';

export const talentegyTechnologyDefinition = {
	id: "talentegy",
	name: "Talentegy",
	website: "https://www.talentegy.com",
	description: "Talentegy is an employee management system.",
	icon: "Talentegy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "talentegy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.talentegy\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
