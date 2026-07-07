import type { TechnologyDefinition } from '../../types';

export const pushengageTechnologyDefinition = {
	id: "pushengage",
	name: "PushEngage",
	website: "https://www.pushengage.com",
	description: "PushEngage is a browser push notification platform that helps content website managers engage visitors by automatically segmenting and sending web push messages.",
	icon: "PushEngage.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "pushengage:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clientcdn\\.pushengage\\.\\w+\\/core"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
