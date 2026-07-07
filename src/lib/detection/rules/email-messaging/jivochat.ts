import type { TechnologyDefinition } from '../../types';

export const jivochatTechnologyDefinition = {
	id: "jivochat",
	name: "JivoChat",
	website: "https://www.jivosite.com",
	description: "JivoChat is a live chat solution for websites offering customizable web and mobile chat widgets.",
	icon: "JivoChat.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "jivochat:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.jivosite\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jivochat:jsGlobal:1",
			kind: "jsGlobal",
			property: "jivo_api",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "jivochat:jsGlobal:2",
			kind: "jsGlobal",
			property: "jivo_version",
			valuePattern: new RegExp("([\\d.]+)"),
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
			"freemium",
			"payg",
			"recurring",
		],
		cpe: "cpe:2.3:a:jivochat:jivochat:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
