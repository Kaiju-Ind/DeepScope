import type { TechnologyDefinition } from '../../types';

export const air360TechnologyDefinition = {
	id: "air360",
	name: "Air360",
	website: "https://www.air360.io",
	description: "Air360 is a technology company that specialises in performance-enhancing, mobile and ecommerce experience analytics.",
	icon: "Air360.png",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "air360:jsGlobal:0",
			kind: "jsGlobal",
			property: "Air360.SDK_Version",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
