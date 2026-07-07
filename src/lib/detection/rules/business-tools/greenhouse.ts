import type { TechnologyDefinition } from '../../types';

export const greenhouseTechnologyDefinition = {
	id: "greenhouse",
	name: "Greenhouse",
	website: "https://www.greenhouse.io",
	description: "Greenhouse is an applicant tracking and hiring tool. Greenhouse features automated workflow, recruitment analytics, CRM, and onboarding.",
	icon: "Greenhouse.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "greenhouse:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.greenhouse\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "greenhouse:jsGlobal:1",
			kind: "jsGlobal",
			property: "populateGreenhouseJobs",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "greenhouse:dom:2",
			kind: "dom",
			selector: "link[href*='cdn\\.greenhouse\\.io/']",
			description: "DOM selector matches a known technology marker.",
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
