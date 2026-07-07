import type { TechnologyDefinition } from '../../types';

export const kintoneTechnologyDefinition = {
	id: "kintone",
	name: "Kintone",
	website: "https://kintone.cybozu.co.jp",
	description: "Kintone is a versatile cloud-based platform offering business data management, CRM, and custom app development.",
	icon: "Kintone.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "kintone:dom:0",
			kind: "dom",
			selector: "iframe[src*='.kintoneapp.com/'], a[href*='.kintoneapp.com/'][target='_blank']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "kintone:jsGlobal:1",
			kind: "jsGlobal",
			property: "kintoneappHost",
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
