import type { TechnologyDefinition } from '../../types';

export const freshteamTechnologyDefinition = {
	id: "freshteam",
	name: "Freshteam",
	website: "https://www.freshworks.com/hrms/",
	description: "Freshteam is a cloud-based HR and applicant tracking solution offered by Freshworks.",
	icon: "Freshteam.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "freshteam:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.freshteam\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "freshteam:dom:1",
			kind: "dom",
			selector: "a[href*='.freshteam.com/jobs']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
