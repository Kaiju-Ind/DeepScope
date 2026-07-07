import type { TechnologyDefinition } from '../../types';

export const doleadTechnologyDefinition = {
	id: "dolead",
	name: "Dolead",
	website: "https://www.dolead.com",
	description: "Dolead is an ad-based lead generation platform that helps businesses acquire potential customers through targeted advertising campaigns.",
	icon: "Dolead.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "dolead:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.dolead\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "dolead:jsGlobal:1",
			kind: "jsGlobal",
			property: "dolead_affiliate_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "dolead:jsGlobal:2",
			kind: "jsGlobal",
			property: "dolead_custom",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
