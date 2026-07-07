import type { TechnologyDefinition } from '../../types';

export const viafouraTechnologyDefinition = {
	id: "viafoura",
	name: "Viafoura",
	website: "https://viafoura.com",
	description: "Viafoura is an audience engagement and social monetisation platform.",
	icon: "viafoura.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "viafoura:jsGlobal:0",
			kind: "jsGlobal",
			property: "dfm_viafoura_options",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "viafoura:jsGlobal:1",
			kind: "jsGlobal",
			property: "viafoura.bootstrap",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "viafoura:jsGlobal:2",
			kind: "jsGlobal",
			property: "viafoura.core",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
