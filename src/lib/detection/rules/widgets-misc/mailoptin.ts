import type { TechnologyDefinition } from '../../types';

export const mailoptinTechnologyDefinition = {
	id: "mailoptin",
	name: "MailOptin",
	website: "https://mailoptin.io/",
	description: "MailOptin is a marketing automation platform that supports lead generation, email automation, and newsletter creation for managing subscriber engagement and email campaigns.",
	icon: "MailOptin.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
		"marketing-automation",
	],
	rules: [
		{
			id: "mailoptin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mailoptin(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mailoptin:jsGlobal:1",
			kind: "jsGlobal",
			property: "mailoptin_globals",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mailoptin:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/scripts\\/mailoptin\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
