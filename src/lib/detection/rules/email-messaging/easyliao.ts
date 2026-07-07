import type { TechnologyDefinition } from '../../types';

export const easyliaoTechnologyDefinition = {
	id: "easyliao",
	name: "EasyLiao",
	website: "https://easyliao.com",
	description: "EasyLiao is a pre-sales customer agent system developed in China, designed to support businesses in handling customer inquiries and engagement before a sale.",
	icon: "EasyLiao.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "easyliao:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.easyliao\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "easyliao:jsGlobal:1",
			kind: "jsGlobal",
			property: "easyliaoIsPC",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "easyliao:jsGlobal:2",
			kind: "jsGlobal",
			property: "easyliao_design_init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
