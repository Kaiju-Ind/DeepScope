import type { TechnologyDefinition } from '../../types';

export const wufooTechnologyDefinition = {
	id: "wufoo",
	name: "Wufoo",
	website: "https://www.wufoo.com",
	description: "Wufoo is an online form builder that creates forms including contact forms, online payments, online surveys and event registrations.",
	icon: "Wufoo.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "wufoo:dom:0",
			kind: "dom",
			selector: "a[href*='.wufoo.com/forms/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
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
