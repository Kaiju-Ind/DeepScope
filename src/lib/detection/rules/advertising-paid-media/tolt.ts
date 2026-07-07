import type { TechnologyDefinition } from '../../types';

export const toltTechnologyDefinition = {
	id: "tolt",
	name: "Tolt",
	website: "https://tolt.io",
	description: "Tolt is an affiliate marketing software designed for SaaS startups.",
	icon: "Tolt.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "tolt:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.tolt\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tolt:jsGlobal:1",
			kind: "jsGlobal",
			property: "toltAPI",
			valuePattern: new RegExp("\\.tolt\\.io\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tolt:jsGlobal:2",
			kind: "jsGlobal",
			property: "tolt_referral",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "tolt:jsGlobal:3",
			kind: "jsGlobal",
			property: "toltio",
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
