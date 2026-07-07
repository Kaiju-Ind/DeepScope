import type { TechnologyDefinition } from '../../types';

export const letroTechnologyDefinition = {
	id: "letro",
	name: "Letro",
	website: "https://service.aainc.co.jp/product/letro/",
	description: "Letro is an UGC and review tool for ecommerce platforms.",
	icon: "Letro.svg",
	categories: [
		"community-ugc",
		"marketing-automation",
	],
	rules: [
		{
			id: "letro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("letro\\.jp\\/tags"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "letro:jsGlobal:1",
			kind: "jsGlobal",
			property: "__letroUgcGadget",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "letro:jsGlobal:2",
			kind: "jsGlobal",
			property: "letroUgcSet",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
