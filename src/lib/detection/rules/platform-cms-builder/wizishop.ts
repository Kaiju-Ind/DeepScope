import type { TechnologyDefinition } from '../../types';

export const wizishopTechnologyDefinition = {
	id: "wizishop",
	name: "WiziShop",
	website: "https://wizishop.com",
	description: "WiziShop is an ecommerce solution provider.",
	icon: "WiziShop.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "wizishop:jsGlobal:0",
			kind: "jsGlobal",
			property: "WIZIBLOCK_ARRAY",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizishop:jsGlobal:1",
			kind: "jsGlobal",
			property: "wiziblocks_list",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizishop:jsGlobal:2",
			kind: "jsGlobal",
			property: "wsCfg.bNavAjust",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wizishop:header:3",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^WiziServer$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wizishop:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^wiziserver$", "i"),
			description: "Response header matches a known technology marker.",
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
