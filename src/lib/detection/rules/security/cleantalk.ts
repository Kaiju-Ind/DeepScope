import type { TechnologyDefinition } from '../../types';

export const cleantalkTechnologyDefinition = {
	id: "cleantalk",
	name: "CleanTalk",
	website: "https://cleantalk.org",
	description: "CleanTalk is an anti-spam plugin system that provides spam protection for various types of websites.",
	icon: "CleanTalk.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "cleantalk:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("moderate\\.cleantalk\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "cleantalk:jsGlobal:1",
			kind: "jsGlobal",
			property: "ctAjaxSetupAddCleanTalkDataBeforeSendAjax",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
