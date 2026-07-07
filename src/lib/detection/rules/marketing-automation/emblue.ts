import type { TechnologyDefinition } from '../../types';

export const emblueTechnologyDefinition = {
	id: "emblue",
	name: "emBlue",
	website: "https://www.embluemail.com/en",
	description: "emBlue is an email and marketing automation platform.",
	icon: "emBlue.svg",
	categories: [
		"marketing-automation",
		"email-messaging",
	],
	rules: [
		{
			id: "emblue:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.embluemail\\.com\\/(?:library\\/([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "emblue:jsGlobal:1",
			kind: "jsGlobal",
			property: "emblueOnSiteApp",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
