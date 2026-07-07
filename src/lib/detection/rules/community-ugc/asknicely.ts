import type { TechnologyDefinition } from '../../types';

export const asknicelyTechnologyDefinition = {
	id: "asknicely",
	name: "AskNicely",
	website: "https://www.asknicely.com",
	description: "AskNicely is a platform that measures and improves customer happiness using the Net Promoter Score (NPS) framework.",
	icon: "AskNicely.svg",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "asknicely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.asknice\\.ly\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "asknicely:jsGlobal:1",
			kind: "jsGlobal",
			property: "askNicelyConversation",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
