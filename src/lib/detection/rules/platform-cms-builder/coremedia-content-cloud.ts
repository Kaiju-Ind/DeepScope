import type { TechnologyDefinition } from '../../types';

export const coremediaContentCloudTechnologyDefinition = {
	id: "coremedia-content-cloud",
	name: "CoreMedia Content Cloud",
	website: "https://www.coremedia.com",
	description: "CoreMedia Content Cloud is an agile content management and digital asset management platform.",
	icon: "CoreMedia Content Cloud.svg",
	categories: [
		"platform-cms-builder",
		"media-video",
	],
	rules: [
		{
			id: "coremedia-content-cloud:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^CoreMedia C(?:ontent Cloud|MS)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "coremedia-content-cloud:meta:1",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^coremedia c(?:ontent cloud|ms)$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
