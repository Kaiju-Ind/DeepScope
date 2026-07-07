import type { TechnologyDefinition } from '../../types';

export const woowupTechnologyDefinition = {
	id: "woowup",
	name: "WoowUp",
	website: "https://www.woowup.com",
	description: "WoowUp is a tool of CRM and predictive marketing.",
	icon: "WoowUp.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "woowup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("assets-cdn\\.woowup\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "woowup:jsGlobal:1",
			kind: "jsGlobal",
			property: "WU._trackProductVTEXField",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
