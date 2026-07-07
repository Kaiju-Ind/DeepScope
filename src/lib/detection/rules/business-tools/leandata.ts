import type { TechnologyDefinition } from '../../types';

export const leandataTechnologyDefinition = {
	id: "leandata",
	name: "LeanData",
	website: "https://www.leandata.com",
	description: "LeanData is a platform that enhances demand management by providing lead-to-account matching and intelligent lead routing.",
	icon: "LeanData.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "leandata:jsGlobal:0",
			kind: "jsGlobal",
			property: "LDBookItPopup",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leandata:jsGlobal:1",
			kind: "jsGlobal",
			property: "LDBookItV2",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "leandata:jsGlobal:2",
			kind: "jsGlobal",
			property: "LDCalendaring",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
