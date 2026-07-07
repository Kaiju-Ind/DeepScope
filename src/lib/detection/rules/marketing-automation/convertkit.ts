import type { TechnologyDefinition } from '../../types';

export const convertkitTechnologyDefinition = {
	id: "convertkit",
	name: "ConvertKit",
	website: "https://convertkit.com",
	description: "ConvertKit is an email marketing tool built for content creators.",
	icon: "ConvertKit.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "convertkit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.convertkit\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "convertkit:dom:1",
			kind: "dom",
			selector: "form[action*='.convertkit.com'], link[href*='.convertkit.com']",
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
