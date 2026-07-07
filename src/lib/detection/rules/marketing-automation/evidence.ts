import type { TechnologyDefinition } from '../../types';

export const evidenceTechnologyDefinition = {
	id: "evidence",
	name: "Evidence",
	website: "https://evidence.io",
	description: "Evidence is a real-time social proof tool designed to increase website conversions by displaying recent customer activity and engagement.",
	icon: "Evidence.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "evidence:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.evidence\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "evidence:jsGlobal:1",
			kind: "jsGlobal",
			property: "EvidenceLoaded",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
