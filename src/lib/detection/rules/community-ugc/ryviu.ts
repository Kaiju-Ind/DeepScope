import type { TechnologyDefinition } from '../../types';

export const ryviuTechnologyDefinition = {
	id: "ryviu",
	name: "Ryviu",
	website: "https://www.ryviu.com/",
	description: "Ryviu is customer product reviews app for building social proof for store.",
	icon: "Ryviu.png",
	categories: [
		"community-ugc",
	],
	rules: [
		{
			id: "ryviu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.ryviu\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ryviu:jsGlobal:1",
			kind: "jsGlobal",
			property: "ryviu_global_settings",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
