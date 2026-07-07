import type { TechnologyDefinition } from '../../types';

export const nocodelyticsTechnologyDefinition = {
	id: "nocodelytics",
	name: "Nocodelytics",
	website: "https://www.nocodelytics.com",
	description: "Nocodelytics is a tool for tracking clicks, searches, CMS items, and more on your Webflow site. It allows you to monitor user activity and important metrics without any coding required.",
	icon: "Nocodelytics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "nocodelytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("tracker\\.nocodelytics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "nocodelytics:jsGlobal:1",
			kind: "jsGlobal",
			property: "__NOCODELYTICS_SITE_ID__",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"poa",
			"recurring",
		],
	},
	requires: [
		"webflow",
	],
} as const satisfies TechnologyDefinition;
