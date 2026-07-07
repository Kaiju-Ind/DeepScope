import type { TechnologyDefinition } from '../../types';

export const webolyticsTechnologyDefinition = {
	id: "webolytics",
	name: "Webolytics",
	website: "https://www.webolytics.com",
	description: "Webolytics is an open API platform designed to track return on advertising spend.",
	icon: "Webolytics.svg",
	categories: [
		"analytics",
		"advertising-paid-media",
	],
	rules: [
		{
			id: "webolytics:jsGlobal:0",
			kind: "jsGlobal",
			property: "webolytics_site_tag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webolytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "webolytics_webhook_call",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webolytics:jsGlobal:2",
			kind: "jsGlobal",
			property: "webo_gtm_id",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webolytics:jsGlobal:3",
			kind: "jsGlobal",
			property: "webo_gtm_label",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webolytics:jsGlobal:4",
			kind: "jsGlobal",
			property: "webo_gtm_prefix",
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
