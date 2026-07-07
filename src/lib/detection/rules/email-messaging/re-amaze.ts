import type { TechnologyDefinition } from '../../types';

export const reAmazeTechnologyDefinition = {
	id: "re-amaze",
	name: "Re:amaze",
	website: "https://www.reamaze.com",
	description: "Re:amaze is a multi-brand customer service, live chat, and help desk solution.",
	icon: "Re-amaze.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "re-amaze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.reamaze\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "re-amaze:jsGlobal:1",
			kind: "jsGlobal",
			property: "reamaze.version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
