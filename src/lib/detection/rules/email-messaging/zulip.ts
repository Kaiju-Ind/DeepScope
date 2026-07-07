import type { TechnologyDefinition } from '../../types';

export const zulipTechnologyDefinition = {
	id: "zulip",
	name: "Zulip",
	website: "https://zulip.com/",
	description: "Zulip is a team chat platform that organizes conversations into topic-based threads to support asynchronous communication for distributed teams.",
	icon: "Zulip.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zulip:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("zulip\\.futo\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"recurring",
		],
		cpe: "cpe:2.3:a:zulip:zulip:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
