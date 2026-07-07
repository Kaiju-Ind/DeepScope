import type { TechnologyDefinition } from '../../types';

export const userreportTechnologyDefinition = {
	id: "userreport",
	name: "UserReport",
	website: "https://www.userreport.com",
	description: "UserReport is an online survey and feedback management platform.",
	icon: "UserReport.svg",
	categories: [
		"developer-tooling",
		"surveys-feedback",
	],
	rules: [
		{
			id: "userreport:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.userreport\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "userreport:dom:1",
			kind: "dom",
			selector: "a[href*='feedback.userreport.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
