import type { TechnologyDefinition } from '../../types';

export const teamtailorTechnologyDefinition = {
	id: "teamtailor",
	name: "Teamtailor",
	website: "https://www.teamtailor.com",
	description: "Teamtailor is an applicant tracking system, career site and analytics dashboard combined, mobile friendly, and  all-in-one recruitment platform.",
	icon: "teamtailor.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "teamtailor:jsGlobal:0",
			kind: "jsGlobal",
			property: "Teamtailor.Ziggeo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
