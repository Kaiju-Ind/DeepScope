import type { TechnologyDefinition } from '../../types';

export const ellucianCrmRecruitTechnologyDefinition = {
	id: "ellucian-crm-recruit",
	name: "Ellucian CRM Recruit",
	website: "https://www.ellucian.com/solutions/ellucian-crm-recruit",
	description: "Ellucian CRM Recruit is a comprehensive solution that supports your entire recruiting and admissions lifecycle.",
	icon: "Ellucian CRM Recruit.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "ellucian-crm-recruit:dom:0",
			kind: "dom",
			selector: " a[href*='.elluciancrmrecruit.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "ellucian-crm-recruit:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ellucian.Recruit",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ellucian-crm-recruit:jsGlobal:2",
			kind: "jsGlobal",
			property: "ellucianAddressChooseLabel",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
