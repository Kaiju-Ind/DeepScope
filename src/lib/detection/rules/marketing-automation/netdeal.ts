import type { TechnologyDefinition } from '../../types';

export const netdealTechnologyDefinition = {
	id: "netdeal",
	name: "Netdeal",
	website: "https://www.netdeal.com.br",
	description: "Netdeal is a marketing automation platform.",
	icon: "Netdeal.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "netdeal:jsGlobal:0",
			kind: "jsGlobal",
			property: "NetdealBuildNumber",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "netdeal:jsGlobal:1",
			kind: "jsGlobal",
			property: "NetdealJs.paywall",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "netdeal:jsGlobal:2",
			kind: "jsGlobal",
			property: "netdealStartSession",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
