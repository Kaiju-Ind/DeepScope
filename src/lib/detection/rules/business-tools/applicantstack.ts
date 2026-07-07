import type { TechnologyDefinition } from '../../types';

export const applicantstackTechnologyDefinition = {
	id: "applicantstack",
	name: "ApplicantStack",
	website: "https://www.applicantstack.com",
	description: "ApplicantStack is a full-service applicant tracking system that automates and streamlines all stages of the hiring process.",
	icon: "ApplicantStack.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "applicantstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.applicantstack\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "applicantstack:dom:1",
			kind: "dom",
			selector: "a[href*='.applicantstack.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
