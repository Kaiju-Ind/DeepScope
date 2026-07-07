import type { TechnologyDefinition } from '../../types';

export const q4TechnologyDefinition = {
	id: "q4",
	name: "Q4",
	website: "https://www.q4inc.com/products/investor-relations-websites/default.aspx",
	description: "Q4 is a SaaS platform that provides communication and intelligence solutions to investor relations professionals.",
	icon: "Q4.png",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "q4:jsGlobal:0",
			kind: "jsGlobal",
			property: "q4App.a11yAnnouncement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "q4:jsGlobal:1",
			kind: "jsGlobal",
			property: "q4Defaults.fancySignup",
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
