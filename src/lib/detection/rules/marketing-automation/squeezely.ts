import type { TechnologyDefinition } from '../../types';

export const squeezelyTechnologyDefinition = {
	id: "squeezely",
	name: "Squeezely",
	website: "https://www.squeezely.tech",
	description: "Squeezely is a customer data platform (CDP) that provides technical capabilities for data collection, segmentation, audience targeting, campaign orchestration, and analytics, empowering businesses to personalise customer experiences and optimise marketing efforts.",
	icon: "Squeezely.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "squeezely:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/squeezely\\.tech\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "squeezely:jsGlobal:1",
			kind: "jsGlobal",
			property: "sqzlCommon.getVariantName",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "squeezely:jsGlobal:2",
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
