import type { TechnologyDefinition } from '../../types';

export const leadbitTechnologyDefinition = {
	id: "leadbit",
	name: "Leadbit",
	website: "https://leadbit.com",
	description: "Leadbit is an offer-based ad system designed to target users with specific ads based on their engagement and preferences.",
	icon: "Leadbit.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "leadbit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.leadbit\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "leadbit:dom:1",
			kind: "dom",
			selector: "form[action*='wapi.leadbit.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
