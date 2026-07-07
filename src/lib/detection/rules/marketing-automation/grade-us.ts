import type { TechnologyDefinition } from '../../types';

export const gradeUsTechnologyDefinition = {
	id: "grade-us",
	name: "Grade.us",
	website: "https://www.grade.us",
	description: "Grade.us is a review management platform for marketing agencies.",
	icon: "GradeUs.svg",
	categories: [
		"marketing-automation",
		"community-ugc",
	],
	rules: [
		{
			id: "grade-us:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.grade\\.us"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grade-us:dom:1",
			kind: "dom",
			selector: "script#gradeus-wjs, iframe[src*='www.grade.us']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
