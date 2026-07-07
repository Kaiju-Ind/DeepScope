import type { TechnologyDefinition } from '../../types';

export const wixAnswersTechnologyDefinition = {
	id: "wix-answers",
	name: "Wix Answers",
	website: "https://www.wixanswers.com",
	description: "Wix Answers is a cloud-based help desk software.",
	icon: "Wix Answers.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "wix-answers:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.wixanswers\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wix-answers:dom:1",
			kind: "dom",
			selector: "iframe[src*='.wixanswers.com/']",
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
