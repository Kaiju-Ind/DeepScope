import type { TechnologyDefinition } from '../../types';

export const pcrecruiterTechnologyDefinition = {
	id: "pcrecruiter",
	name: "PCRecruiter",
	website: "https://www.pcrecruiter.net",
	description: "PCRecruiter is an ATS/CRM hybrid SaaS solution for recruiting and sourcing professionals.",
	icon: "PCRecruiter.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "pcrecruiter:jsGlobal:0",
			kind: "jsGlobal",
			property: "pcrbaseurl",
			valuePattern: new RegExp("\\.pcrecruiter\\.net\\/"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pcrecruiter:jsGlobal:1",
			kind: "jsGlobal",
			property: "pcrdialog",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pcrecruiter:jsGlobal:2",
			kind: "jsGlobal",
			property: "pcrframeoptions",
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
