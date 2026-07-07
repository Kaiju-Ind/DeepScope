import type { TechnologyDefinition } from '../../types';

export const zohoRecruitTechnologyDefinition = {
	id: "zoho-recruit",
	name: "Zoho Recruit",
	website: "https://www.zoho.com/recruit/",
	description: "Zoho Recruit is a recruitment platform that integrates an applicant tracking system (ATS) with customer relationship management (CRM) functionality.",
	icon: "Zoho.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "zoho-recruit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.zohocdn\\.com\\/recruit\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
