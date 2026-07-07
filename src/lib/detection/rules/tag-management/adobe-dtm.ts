import type { TechnologyDefinition } from '../../types';

export const adobeDtmTechnologyDefinition = {
	id: "adobe-dtm",
	name: "Adobe DTM",
	website: "https://marketing.adobe.com/resources/help/en_US/dtm/c_overview.html",
	description: "Dynamic Tag Management (DTM) is a tag management solution for Adobe Experience Cloud applications and others.",
	icon: "adobedtm.png",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "adobe-dtm:jsGlobal:0",
			kind: "jsGlobal",
			property: "_satellite.buildDate",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
