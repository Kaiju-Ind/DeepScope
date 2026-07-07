import type { TechnologyDefinition } from '../../types';

export const yourgptTechnologyDefinition = {
	id: "yourgpt",
	name: "YourGPT",
	website: "https://yourgpt.ai",
	description: "YourGPT is a platform that provides customizable AI and GPT tools, enabling the integration of large language models for diverse operational needs and supporting more efficient business processes.",
	icon: "YourGPT.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "yourgpt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.yourgpt\\.ai"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "yourgpt:jsGlobal:1",
			kind: "jsGlobal",
			property: "$yourgptChatbot",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yourgpt:jsGlobal:2",
			kind: "jsGlobal",
			property: "YOURGPT_WIDGET_UID",
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
