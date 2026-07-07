import type { TechnologyDefinition } from '../../types';

export const coroverTechnologyDefinition = {
	id: "corover",
	name: "CoRover",
	website: "https://corover.ai",
	description: "CoRover is a conversational AI chatbot platform with proprietary cognitive AI technology.",
	icon: "CoRover.png",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "corover:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.corover\\.mobi\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "corover:jsGlobal:1",
			kind: "jsGlobal",
			property: "CoRover_tag",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
