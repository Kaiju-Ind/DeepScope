import type { TechnologyDefinition } from '../../types';

export const nemuTechnologyDefinition = {
	id: "nemu",
	name: "Nemu",
	website: "https://usenemu.com",
	description: "Nemu is a platform that enables end-to-end tracking to monitor and optimize campaign performance, supporting improved profitability.",
	icon: "Nemu.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "nemu:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("trackings\\.nemu\\.com\\.br"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nemu:jsGlobal:1",
			kind: "jsGlobal",
			property: "trackingNemu",
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
