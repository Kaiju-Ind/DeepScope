import type { TechnologyDefinition } from '../../types';

export const comeetTechnologyDefinition = {
	id: "comeet",
	name: "Comeet",
	website: "https://www.comeet.com",
	description: "Comeet is an Collaborative Recruiting, and Applicant Tracking System.",
	icon: "comeet.svg",
	categories: [
		"widgets-misc",
		"business-tools",
	],
	rules: [
		{
			id: "comeet:jsGlobal:0",
			kind: "jsGlobal",
			property: "COMEET",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "comeet:jsGlobal:1",
			kind: "jsGlobal",
			property: "comeetInit",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
