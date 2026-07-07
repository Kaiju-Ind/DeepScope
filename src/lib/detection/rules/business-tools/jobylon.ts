import type { TechnologyDefinition } from '../../types';

export const jobylonTechnologyDefinition = {
	id: "jobylon",
	name: "Jobylon",
	website: "https://www.jobylon.com",
	description: "Jobylon is a flexible talent acquisition platform designed to help leading employers streamline recruitment and manage hiring processes.",
	icon: "Jobylon.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jobylon:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jobylon\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
