import type { TechnologyDefinition } from '../../types';

export const ctrwowTechnologyDefinition = {
	id: "ctrwow",
	name: "CTRWOW",
	website: "https://www.wowsuite.ai/ctrwow.html",
	description: "CTRWOW is a system designed for building template funnels, offering tools for streamlining the creation and management of marketing funnels.",
	icon: "CTRWow.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "ctrwow:jsGlobal:0",
			kind: "jsGlobal",
			property: "CTR_IMG_LAZY_LOADER",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ctrwow:jsGlobal:1",
			kind: "jsGlobal",
			property: "_CTR_CUSTOM_DATA",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ctrwow:jsGlobal:2",
			kind: "jsGlobal",
			property: "_CTR_FINGERPRINTJS_TOKEN",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ctrwow:jsGlobal:3",
			kind: "jsGlobal",
			property: "__CTRWOW_CONFIG",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ctrwow:jsGlobal:4",
			kind: "jsGlobal",
			property: "ctrwowUtils",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
