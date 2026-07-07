import type { TechnologyDefinition } from '../../types';

export const satoriTechnologyDefinition = {
	id: "satori",
	name: "Satori",
	website: "https://satori.marketing",
	description: "Satori provides marketing automation software.",
	icon: "Satori.png",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "satori:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("satori\\.segs\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "satori:dom:1",
			kind: "dom",
			selector: "iframe[src*='satori.segs.jp/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "satori:jsGlobal:2",
			kind: "jsGlobal",
			property: "SatoriForm",
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
