import type { TechnologyDefinition } from '../../types';

export const zimbraTechnologyDefinition = {
	id: "zimbra",
	name: "Zimbra",
	website: "https://www.zimbra.com/",
	description: "Zimbra is a provider of open-source email and collaboration software, offering solutions for email, calendar, contacts, and collaboration for both individual and enterprise use.",
	icon: "Zimbra.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "zimbra:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ZM_TEST$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "zimbra:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^zm_test$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:zimbra:zimbra:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
