import type { TechnologyDefinition } from '../../types';

export const eberTechnologyDefinition = {
	id: "eber",
	name: "Eber",
	website: "https://eber.co",
	description: "Eber is a consumer engagement management platform for retail, F&B, hotels, and more.",
	icon: "Eber.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "eber:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("widget\\.eber\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "eber:jsGlobal:1",
			kind: "jsGlobal",
			property: "Eber",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eber:jsGlobal:2",
			kind: "jsGlobal",
			property: "EberVars.channelId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "eber:jsGlobal:3",
			kind: "jsGlobal",
			property: "intervalEberJQuery",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
