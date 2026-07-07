import type { TechnologyDefinition } from '../../types';

export const staffbaseTechnologyDefinition = {
	id: "staffbase",
	name: "Staffbase",
	website: "https://staffbase.com",
	description: "Staffbase is an internal communications platform provider.",
	icon: "Staffbase.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "staffbase:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.staffbasestatic\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "staffbase:jsGlobal:1",
			kind: "jsGlobal",
			property: "staffbase",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "staffbase:jsGlobal:2",
			kind: "jsGlobal",
			property: "staffbaseIconFontVersion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "staffbase:jsGlobal:3",
			kind: "jsGlobal",
			property: "webpackChunkStaffbase",
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
