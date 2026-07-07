import type { TechnologyDefinition } from '../../types';

export const ottertextTechnologyDefinition = {
	id: "ottertext",
	name: "OtterText",
	website: "https://ottertext.com",
	description: "OtterText is a platform offering SMS marketing and automation solutions designed to enhance communication and streamline marketing campaigns.",
	icon: "OtterText.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ottertext:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.ottertext\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ottertext:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^otter_text_session$", "i"),
			description: "Cookie name matches a known technology marker.",
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
