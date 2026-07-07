import type { TechnologyDefinition } from '../../types';

export const sabavisionTechnologyDefinition = {
	id: "sabavision",
	name: "SabaVision",
	website: "https://www.sabavision.com",
	description: "SabaVision, one of the core products of SabaIdea, is Iran's largest online advertising agency.",
	icon: "SabaVision.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "sabavision:jsGlobal:0",
			kind: "jsGlobal",
			property: "SabavisionElement",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sabavision:jsGlobal:1",
			kind: "jsGlobal",
			property: "__SABAVISION_GET_ADD_TIMEOUT",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sabavision:jsGlobal:2",
			kind: "jsGlobal",
			property: "sabaVisionWebsiteID",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sabavision:jsGlobal:3",
			kind: "jsGlobal",
			property: "sabaVisionWebsitePage",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
