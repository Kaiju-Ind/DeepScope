import type { TechnologyDefinition } from '../../types';

export const leadscoreTechnologyDefinition = {
	id: "leadscore",
	name: "LeadScore",
	website: "https://www.leadscore.io/",
	description: "LeadScore is an inbound marketing automation system facilitating streamlined digital marketing processes.",
	icon: "LeadScore.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadscore:jsGlobal:0",
			kind: "jsGlobal",
			property: "trackLeadScore",
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
