import type { TechnologyDefinition } from '../../types';

export const ambassadorTechnologyDefinition = {
	id: "ambassador",
	name: "Ambassador",
	website: "https://www.getambassador.com",
	description: "Ambassador is a marketer-friendly software that simplifies referral marketing and helps automating the enrolment, tracking, rewarding and management process.",
	icon: "Ambassador.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ambassador:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.getambassador\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ambassador:jsGlobal:1",
			kind: "jsGlobal",
			property: "_mbsy.integrations",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
