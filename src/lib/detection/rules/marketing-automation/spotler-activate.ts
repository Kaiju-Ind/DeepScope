import type { TechnologyDefinition } from '../../types';

export const spotlerActivateTechnologyDefinition = {
	id: "spotler-activate",
	name: "Spotler Activate",
	website: "https://spotleractivate.com",
	description: "Spotler Activate is a customer data platform (CDP) that provides technical capabilities for data collection, segmentation, audience targeting, campaign orchestration, and analytics, empowering businesses to personalise customer experiences and optimise marketing efforts.",
	icon: "SpotlerActivate.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "spotler-activate:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/squeezely\\.tech\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spotler-activate:jsGlobal:1",
			kind: "jsGlobal",
			property: "sqzlCommon.getVariantName",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spotler-activate:jsGlobal:2",
			kind: "jsGlobal",
			property: "sqzlPersonalization",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"high",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
