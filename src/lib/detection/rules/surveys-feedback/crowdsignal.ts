import type { TechnologyDefinition } from '../../types';

export const crowdsignalTechnologyDefinition = {
	id: "crowdsignal",
	name: "Crowdsignal",
	website: "https://crowdsignal.com",
	description: "Crowdsignal is an online tool formerly known as Polldaddy that enables the creation of free polls for embedding on websites.",
	icon: "Crowdsignal.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "crowdsignal:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("secure\\.polldaddy\\.com"),
			description: "Script source URL matches a known technology marker.",
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
