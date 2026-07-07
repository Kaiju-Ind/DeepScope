import type { TechnologyDefinition } from '../../types';

export const jobadderTechnologyDefinition = {
	id: "jobadder",
	name: "JobAdder",
	website: "https://jobadder.com",
	description: "JobAdder is a cloud-based recruitment management platform for staffing agencies and in-house corporate hiring teams.",
	icon: "JobAdder.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "jobadder:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jobadder\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jobadder:dom:1",
			kind: "dom",
			selector: "a[href*='clientapps.jobadder.com/'], link[href*='jobadder.com']",
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
