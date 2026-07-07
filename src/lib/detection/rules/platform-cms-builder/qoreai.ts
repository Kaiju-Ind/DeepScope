import type { TechnologyDefinition } from '../../types';

export const qoreaiTechnologyDefinition = {
	id: "qoreai",
	name: "QoreAI",
	website: "https://www.qoreai.com",
	description: "QoreAI is an all-in-one collaboration operating system designed for the automotive industry.",
	icon: "QoreAI.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "qoreai:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.qoreai\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "qoreai:jsGlobal:1",
			kind: "jsGlobal",
			property: "QoreAI.execute",
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
