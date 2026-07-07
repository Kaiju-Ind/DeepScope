import type { TechnologyDefinition } from '../../types';

export const everyactionTechnologyDefinition = {
	id: "everyaction",
	name: "EveryAction",
	website: "https://www.everyaction.com",
	description: "EveryAction provides fundraising software, donor management software, and CRM software to nonprofit organisations.",
	icon: "EveryAction.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "everyaction:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.everyaction\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "everyaction:dom:1",
			kind: "dom",
			selector: "a[href*='secure.everyaction.com/'], div[data-form-url*='secure.everyaction.com/']",
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
