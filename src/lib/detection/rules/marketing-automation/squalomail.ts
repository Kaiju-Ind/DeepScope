import type { TechnologyDefinition } from '../../types';

export const squalomailTechnologyDefinition = {
	id: "squalomail",
	name: "SqualoMail",
	website: "https://www.squalomail.com",
	description: "SqualoMail is an email marketing platform that helps businesses manage newsletters and automated campaigns to improve audience engagement and drive sales.",
	icon: "SqualoMail.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "squalomail:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.squalomail\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
