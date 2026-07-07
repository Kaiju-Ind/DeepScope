import type { TechnologyDefinition } from '../../types';

export const mailmanTechnologyDefinition = {
	id: "mailman",
	name: "Mailman",
	website: "https://list.org",
	description: "Mailman is free software for managing electronic mail discussion and e-newsletter lists. Mailman is integrated with the web, making it easy for users to manage their accounts and for list owners to administer their lists. Mailman supports built-in archiving, automatic bounce processing, content filtering, digest delivery, spam filters, and more.",
	icon: "Mailman.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "mailman:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/mailman\\d+\\/static\\/.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailman:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/(?:hyperkitty|django-mailman3)\\/.+\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:gnu:mailman:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
