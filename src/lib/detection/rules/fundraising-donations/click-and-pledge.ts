import type { TechnologyDefinition } from '../../types';

export const clickAndPledgeTechnologyDefinition = {
	id: "click-and-pledge",
	name: "Click & Pledge",
	website: "https://clickandpledge.com",
	description: "Click & Pledge is an online fundraising and payment platform for nonprofits.",
	icon: "Click & Pledge.png",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "click-and-pledge:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.clickandpledge\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "click-and-pledge:dom:1",
			kind: "dom",
			selector: "a[href*='.clickandpledge.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
