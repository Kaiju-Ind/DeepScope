import type { TechnologyDefinition } from '../../types';

export const pancakeTechnologyDefinition = {
	id: "pancake",
	name: "Pancake",
	website: "https://pancake.vn",
	description: "Pancake is an omnichannel business messaging platform that centralizes customer communications across multiple channels into a single system for managing conversations, routing messages, and maintaining consistent engagement.",
	icon: "Pancake.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "pancake:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("analytics\\.pancake\\.vn"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pancake:jsGlobal:1",
			kind: "jsGlobal",
			property: "PancakeAnalytics",
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
