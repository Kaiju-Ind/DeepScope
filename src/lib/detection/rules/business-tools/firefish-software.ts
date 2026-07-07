import type { TechnologyDefinition } from '../../types';

export const firefishSoftwareTechnologyDefinition = {
	id: "firefish-software",
	name: "Firefish Software",
	website: "https://www.firefishsoftware.com",
	description: "Firefish Software is a recruitment CRM for professional recruiters and recruitment agencies.",
	icon: "FireFish.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "firefish-software:jsGlobal:0",
			kind: "jsGlobal",
			property: "ffControlSystem",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "firefish-software:jsGlobal:1",
			kind: "jsGlobal",
			property: "firefish",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
