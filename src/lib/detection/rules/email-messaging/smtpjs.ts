import type { TechnologyDefinition } from '../../types';

export const smtpjsTechnologyDefinition = {
	id: "smtpjs",
	name: "SmtpJS",
	website: "https://smtpjs.com",
	description: "SmtpJS is a free library you can use for sending emails from JavaScript.",
	icon: "default.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "smtpjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/smtpjs\\.com\\/(?:v([\\d\\.]+)\\/)?smtp\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
