import type { TechnologyDefinition } from '../../types';

export const envialosimpleTechnologyDefinition = {
	id: "envialosimple",
	name: "EnvialoSimple",
	website: "https://envialosimple.com",
	description: "EnvialoSimple is a marketing platform and newsletter management system used to create, send, and track email campaigns.",
	icon: "EnvialoSimple.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "envialosimple:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.envialosimple\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
