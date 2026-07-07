import type { TechnologyDefinition } from '../../types';

export const indeedTechnologyDefinition = {
	id: "indeed",
	name: "Indeed",
	website: "https://www.indeed.com",
	description: "Indeed is a platform that provides embedded code for tracking job-related clicks and supports job search functionality.",
	icon: "Indeed.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "indeed:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.indeed\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "indeed:jsGlobal:1",
			kind: "jsGlobal",
			property: "indeed_clk",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
