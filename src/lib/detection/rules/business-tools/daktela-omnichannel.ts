import type { TechnologyDefinition } from '../../types';

export const daktelaOmnichannelTechnologyDefinition = {
	id: "daktela-omnichannel",
	name: "Daktela Omnichannel",
	website: "https://daktela.com",
	description: "Daktela Omnichannel is a unified platform that streamlines customer interactions across multiple channels to enhance satisfaction and support business growth.",
	icon: "Daktela.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "daktela-omnichannel:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.daktela\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "daktela-omnichannel:jsGlobal:1",
			kind: "jsGlobal",
			property: "daktelaCli",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "daktela-omnichannel:jsGlobal:2",
			kind: "jsGlobal",
			property: "daktelaGuiConfig",
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
