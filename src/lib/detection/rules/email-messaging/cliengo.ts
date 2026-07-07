import type { TechnologyDefinition } from '../../types';

export const cliengoTechnologyDefinition = {
	id: "cliengo",
	name: "Cliengo",
	website: "https://www.cliengo.com",
	description: "Cliengo is a platform that automates website conversations using Artificial Intelligence to enhance customer engagement and drive sales.",
	icon: "Cliengo.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "cliengo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("s\\.cliengo\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cliengo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Cliengo.chatConfig",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
