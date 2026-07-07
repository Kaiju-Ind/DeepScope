import type { TechnologyDefinition } from '../../types';

export const plannitTechnologyDefinition = {
	id: "plannit",
	name: "Plannit",
	website: "https://plannit.io",
	description: "Plannit is a task management home services network.",
	icon: "Plannit.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "plannit:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.plannit\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "plannit:jsGlobal:1",
			kind: "jsGlobal",
			property: "PlannitCallTracking",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
