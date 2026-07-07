import type { TechnologyDefinition } from '../../types';

export const bullseyeTechnologyDefinition = {
	id: "bullseye",
	name: "Bullseye",
	website: "https://www.bullseyelocations.com",
	description: "Bullseye is a store locator software designed for location marketers, providing tools to help customers find nearby stores easily.",
	icon: "Bullseye.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "bullseye:jsGlobal:0",
			kind: "jsGlobal",
			property: "bullseyeTracking",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bullseye:jsGlobal:1",
			kind: "jsGlobal",
			property: "bullseyelistener",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "bullseye:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.bullseyelocations\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
