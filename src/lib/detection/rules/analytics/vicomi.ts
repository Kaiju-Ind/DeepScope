import type { TechnologyDefinition } from '../../types';

export const vicomiTechnologyDefinition = {
	id: "vicomi",
	name: "Vicomi",
	website: "https://www.vicomi.com/emotion-analytics-for-brands-and-agencies",
	description: "Vicomi is a tool that provides insights into audience reactions to content.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "vicomi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets-prod\\.vicomi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
