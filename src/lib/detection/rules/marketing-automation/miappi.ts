import type { TechnologyDefinition } from '../../types';

export const miappiTechnologyDefinition = {
	id: "miappi",
	name: "Miappi",
	website: "https://miappi.com",
	description: "Miappi is a user-generated content platform designed to build trust and boost sales for brands.",
	icon: "Miappi.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "miappi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("web\\.miappi\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "miappi:dom:1",
			kind: "dom",
			selector: "script[data-src*='web.miappi.com']",
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
