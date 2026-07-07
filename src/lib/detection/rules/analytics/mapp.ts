import type { TechnologyDefinition } from '../../types';

export const mappTechnologyDefinition = {
	id: "mapp",
	name: "Mapp",
	website: "https://mapp.com",
	description: "Mapp is designed specifically to help consumer-facing brands run highly personalised, cross-channel marketing campaigns powered by real-time customer data and generated insights.",
	icon: "Mapp.svg",
	categories: [
		"analytics",
		"marketing-automation",
	],
	rules: [
		{
			id: "mapp:jsGlobal:0",
			kind: "jsGlobal",
			property: "WebtrekkV3",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:1",
			kind: "jsGlobal",
			property: "webtrekk",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:2",
			kind: "jsGlobal",
			property: "webtrekkConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:3",
			kind: "jsGlobal",
			property: "webtrekkHeatmapObjects",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:4",
			kind: "jsGlobal",
			property: "webtrekkLinktrackObjects",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:5",
			kind: "jsGlobal",
			property: "webtrekkUnloadObjects",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:6",
			kind: "jsGlobal",
			property: "webtrekkV3",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:7",
			kind: "jsGlobal",
			property: "wtSmart",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:8",
			kind: "jsGlobal",
			property: "wt_tt",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mapp:jsGlobal:9",
			kind: "jsGlobal",
			property: "wt_ttv2",
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
