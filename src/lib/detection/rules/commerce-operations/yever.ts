import type { TechnologyDefinition } from '../../types';

export const yeverTechnologyDefinition = {
	id: "yever",
	name: "Yever",
	website: "https://www.yever.com.br",
	description: "Yever is a digital payment and checkout platform that enables secure online transactions for businesses and customers.",
	icon: "Yever.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "yever:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.yever\\.com\\.br"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "yever:jsGlobal:1",
			kind: "jsGlobal",
			property: "currentUrlYever",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "yever:jsGlobal:2",
			kind: "jsGlobal",
			property: "getUtmsUrlYever",
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
