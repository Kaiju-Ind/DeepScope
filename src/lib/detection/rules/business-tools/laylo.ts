import type { TechnologyDefinition } from '../../types';

export const layloTechnologyDefinition = {
	id: "laylo",
	name: "Laylo",
	website: "https://laylo.com",
	description: "Laylo is a drop CRM platform that enables artists to notify fans when merchandise, tickets, or content becomes available.",
	icon: "Laylo.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "laylo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("embed\\.laylo\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "laylo:jsGlobal:1",
			kind: "jsGlobal",
			property: "layloSdkLoading",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
