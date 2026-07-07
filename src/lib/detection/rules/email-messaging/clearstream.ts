import type { TechnologyDefinition } from '../../types';

export const clearstreamTechnologyDefinition = {
	id: "clearstream",
	name: "Clearstream",
	website: "https://clearstream.io",
	description: "Cloudstream is a communication platform that provides texting and email services for congregational outreach and engagement.",
	icon: "Clearstream.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "clearstream:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.clearstream\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
