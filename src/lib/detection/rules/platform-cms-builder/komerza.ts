import type { TechnologyDefinition } from '../../types';

export const komerzaTechnologyDefinition = {
	id: "komerza",
	name: "Komerza",
	website: "https://komerza.com",
	description: "Komerza is a commerce engine designed for modern brands that provides scalable infrastructure for managing online sales and supporting growth without predefined limits.",
	icon: "Komerza.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "komerza:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.komerza\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "komerza:jsGlobal:1",
			kind: "jsGlobal",
			property: "Komerza.open",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "komerza:jsGlobal:2",
			kind: "jsGlobal",
			property: "initKomerza",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
