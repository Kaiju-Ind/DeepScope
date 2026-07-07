import type { TechnologyDefinition } from '../../types';

export const smartrecruitersTechnologyDefinition = {
	id: "smartrecruiters",
	name: "SmartRecruiters",
	website: "https://www.smartrecruiters.com",
	description: "SmartRecruiters is a web-based talent acquisition platform.",
	icon: "SmartRecruiters.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "smartrecruiters:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smartrecruiters\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smartrecruiters:dom:1",
			kind: "dom",
			selector: "a[href*='careers.smartrecruiters.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
