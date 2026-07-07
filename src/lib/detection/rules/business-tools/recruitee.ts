import type { TechnologyDefinition } from '../../types';

export const recruiteeTechnologyDefinition = {
	id: "recruitee",
	name: "Recruitee",
	website: "https://recruitee.com",
	description: "Recruitee is an integrated cloud-based recruitment management and applicant tracking system.",
	icon: "Recruitee.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "recruitee:dom:0",
			kind: "dom",
			selector: "a[href*='.recruitee.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "recruitee:jsGlobal:1",
			kind: "jsGlobal",
			property: "RtApp.mapBoxToken",
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
