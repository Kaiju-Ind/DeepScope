import type { TechnologyDefinition } from '../../types';

export const klicktippTechnologyDefinition = {
	id: "klicktipp",
	name: "KlickTipp",
	website: "https://www.klicktipp.com",
	description: "KlickTipp is an email marketing service offering a range of features for businesses, including newsletter creation, SMS functionality, and marketing automation tools.",
	icon: "KlickTipp.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "klicktipp:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets\\.klicktipp\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "klicktipp:dom:1",
			kind: "dom",
			selector: "form[action*='app.klicktipp.com/api']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
