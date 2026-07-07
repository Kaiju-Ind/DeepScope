import type { TechnologyDefinition } from '../../types';

export const gistTechnologyDefinition = {
	id: "gist",
	name: "Gist",
	website: "https://getgist.com/live-chat",
	description: "Gist is email marketing automation, live chat, and helpdesk software.",
	icon: "gist_live_chat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "gist:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.getgist\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "gist:jsGlobal:1",
			kind: "jsGlobal",
			property: "gist.options.versionNumber",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "gist:jsGlobal:2",
			kind: "jsGlobal",
			property: "gist.setAppId ",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
