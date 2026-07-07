import type { TechnologyDefinition } from '../../types';

export const chativeTechnologyDefinition = {
	id: "chative",
	name: "Chative",
	website: "https://chative.io",
	description: "Chative is a platform that provides live chat and chatbot solutions for real-time customer interactions.",
	icon: "Chative.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "chative:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.chative\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "chative:jsGlobal:1",
			kind: "jsGlobal",
			property: "Chative.app_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chative:jsGlobal:2",
			kind: "jsGlobal",
			property: "ChativeApi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "chative:jsGlobal:3",
			kind: "jsGlobal",
			property: "ChativeEvents",
			description: "Page-owned global matches a known technology marker.",
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
