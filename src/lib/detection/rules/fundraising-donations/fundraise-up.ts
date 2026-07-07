import type { TechnologyDefinition } from '../../types';

export const fundraiseUpTechnologyDefinition = {
	id: "fundraise-up",
	name: "Fundraise Up",
	website: "https://fundraiseup.com",
	description: "Fundraise Up is a platform for online donations.",
	icon: "Fundraise Up.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "fundraise-up:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.fundraiseup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fundraise-up:jsGlobal:1",
			kind: "jsGlobal",
			property: "FundraiseUp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
