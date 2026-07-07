import type { TechnologyDefinition } from '../../types';

export const lotlinxTechnologyDefinition = {
	id: "lotlinx",
	name: "LotLinx",
	website: "https://lotlinx.com/",
	description: "LotLinx is a provider of digital retailing and marketing technologies for the automotive industry.",
	icon: "LotLinx.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "lotlinx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.lotlinx\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "lotlinx:jsGlobal:1",
			kind: "jsGlobal",
			property: "LXLoader",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "lotlinx:jsGlobal:2",
			kind: "jsGlobal",
			property: "LotLinxID",
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
