import type { TechnologyDefinition } from '../../types';

export const bynderTechnologyDefinition = {
	id: "bynder",
	name: "Bynder",
	website: "https://www.bynder.com",
	description: "Bynder is a cloud-based marketing platform where brands create, find, and use all their digital content.",
	icon: "Bynder.svg",
	categories: [
		"media-video",
	],
	rules: [
		{
			id: "bynder:jsGlobal:0",
			kind: "jsGlobal",
			property: "Bynder.cloudfront",
			valuePattern: new RegExp("\\.cloudfront\\.net\\/frontend\\/([\\d\\.]+)\\/"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bynder:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^bynder$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
