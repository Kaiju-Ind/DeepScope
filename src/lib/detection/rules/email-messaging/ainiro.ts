import type { TechnologyDefinition } from '../../types';

export const ainiroTechnologyDefinition = {
	id: "ainiro",
	name: "AINIRO",
	website: "https://ainiro.io",
	description: "AINIRO is a provider of AI chatbots, AI agents, and custom AI solutions designed for various applications.",
	icon: "AINIRO.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "ainiro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ainiro\\.io"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ainiro:jsGlobal:1",
			kind: "jsGlobal",
			property: "ainiro.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ainiro:jsGlobal:2",
			kind: "jsGlobal",
			property: "ainiro_faq_question",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
