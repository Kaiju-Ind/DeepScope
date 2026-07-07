import type { TechnologyDefinition } from '../../types';

export const aweberTechnologyDefinition = {
	id: "aweber",
	name: "Aweber",
	website: "https://www.aweber.com",
	description: "AWeber is an email marketing and automation platform for newsletters, forms, and campaigns.",
	icon: "Aweber.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "aweber:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.aweber\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aweber:dom:1",
			kind: "dom",
			selector: "form[action*='aweber.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aweber:jsGlobal:2",
			kind: "jsGlobal",
			property: "awt_analytics",
			description: "Page-owned global matches a known technology marker.",
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
