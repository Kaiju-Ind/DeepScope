import type { TechnologyDefinition } from '../../types';

export const uxsniffTechnologyDefinition = {
	id: "uxsniff",
	name: "UXSniff",
	website: "https://uxsniff.com",
	description: "UXSniff is an UX analysis tool that automatically detects usability issues by analyzing user behavior, including layout shifts and rage clicks, to identify potential conversion problems early.",
	icon: "UXSniff.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "uxsniff:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.uxsniff\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "uxsniff:jsGlobal:1",
			kind: "jsGlobal",
			property: "__UXS_BEACON_COOLDOWN_MS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "uxsniff:jsGlobal:2",
			kind: "jsGlobal",
			property: "__uxs_beaconInCooldown",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
