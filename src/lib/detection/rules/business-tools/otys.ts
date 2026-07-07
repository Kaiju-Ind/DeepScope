import type { TechnologyDefinition } from '../../types';

export const otysTechnologyDefinition = {
	id: "otys",
	name: "OTYS",
	website: "https://www.otys.nl",
	description: "OTYS is a Dutch company that specialises in providing recruitment and staffing agencies with software solutions to manage their workflows, including applicant tracking systems, job board integrations, and candidate sourcing tools.",
	icon: "OTYS.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "otys:jsGlobal:0",
			kind: "jsGlobal",
			property: "OTYS.siteId",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "otys:jsGlobal:1",
			kind: "jsGlobal",
			property: "otysSelect",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
