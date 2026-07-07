import type { TechnologyDefinition } from '../../types';

export const kasikaTechnologyDefinition = {
	id: "kasika",
	name: "Kasika",
	website: "https://cocolive.co.jp/",
	description: "Kasika is a Japanese marketing automation tool developed by CocoLive.",
	icon: "Kasika.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "kasika:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("panda\\.kasika\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
