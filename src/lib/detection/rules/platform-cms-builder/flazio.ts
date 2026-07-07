import type { TechnologyDefinition } from '../../types';

export const flazioTechnologyDefinition = {
	id: "flazio",
	name: "Flazio",
	website: "https://flazio.com",
	description: "Flazio is an Italian website builder.",
	icon: "Flazio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "flazio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/flazio\\.org\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "flazio:jsGlobal:1",
			kind: "jsGlobal",
			property: "_exaudiflazio",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "flazio:jsGlobal:2",
			kind: "jsGlobal",
			property: "flazio_global_conversion",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
