import type { TechnologyDefinition } from '../../types';

export const biteTechnologyDefinition = {
	id: "bite",
	name: "BITE",
	website: "https://www.b-ite.de",
	description: "BITE is an e-recruiting software platform that supports digital recruitment processes, including candidate sourcing, application management, and hiring workflow automation.",
	icon: "BITE.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "bite:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bite.JobAdsLoaderFilterCreator",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bite:jsGlobal:1",
			kind: "jsGlobal",
			property: "BiteJobsApiV5.BUILD",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
