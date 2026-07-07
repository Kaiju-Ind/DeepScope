import type { TechnologyDefinition } from '../../types';

export const infolinksTechnologyDefinition = {
	id: "infolinks",
	name: "Infolinks",
	website: "https://www.infolinks.com",
	description: "Infolinks is an online advertising platform for publishers and advertisers.",
	icon: "Infolinks.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "infolinks:jsGlobal:0",
			kind: "jsGlobal",
			property: "infolinks_pid",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "infolinks:jsGlobal:1",
			kind: "jsGlobal",
			property: "infolinks_wsid",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
