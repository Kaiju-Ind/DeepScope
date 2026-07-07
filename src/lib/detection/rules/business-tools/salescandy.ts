import type { TechnologyDefinition } from '../../types';

export const salescandyTechnologyDefinition = {
	id: "salescandy",
	name: "SalesCandy",
	website: "https://www.salescandy.com",
	description: "SalesCandy is a sales performance improvement solution designed to optimize sales team efficiency through automated lead distribution, real-time tracking, and actionable insights.",
	icon: "SalesCandy.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "salescandy:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.salescandy\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "salescandy:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("\\.salescandy\\.com\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
