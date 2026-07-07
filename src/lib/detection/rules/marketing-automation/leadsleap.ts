import type { TechnologyDefinition } from '../../types';

export const leadsleapTechnologyDefinition = {
	id: "leadsleap",
	name: "LeadsLeap",
	website: "https://leadsleap.com",
	description: "LeadsLeap is a lead generation system designed to collect, manage, and organize potential customer data to support marketing and sales workflows.",
	icon: "LeadsLeap.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "leadsleap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pjs\\.leadsleap\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
