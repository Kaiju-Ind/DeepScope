import type { TechnologyDefinition } from '../../types';

export const rschooltodayTechnologyDefinition = {
	id: "rschooltoday",
	name: "rSchoolToday",
	website: "https://rschooltoday.com",
	description: "rSchoolToday is an all-in-one platform for managing high school activities.",
	icon: "rSchoolToday.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rschooltoday:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.rschooltoday\\.com"),
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
