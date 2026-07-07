import type { TechnologyDefinition } from '../../types';

export const niftTechnologyDefinition = {
	id: "nift",
	name: "Nift",
	website: "https://www.gonift.com",
	description: "Nift is a marketing program for pools of local businesses. Businesses give Nift gift cards to thank and reward their customers for taking actions, like signing up for a newsletter, referring a friend, or making a purchase.",
	icon: "Nift.png",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "nift:jsGlobal:0",
			kind: "jsGlobal",
			property: "NiftAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nift:jsGlobal:1",
			kind: "jsGlobal",
			property: "NiftJS",
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
