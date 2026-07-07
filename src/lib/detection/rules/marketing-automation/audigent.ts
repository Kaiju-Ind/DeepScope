import type { TechnologyDefinition } from '../../types';

export const audigentTechnologyDefinition = {
	id: "audigent",
	name: "Audigent",
	website: "https://audigent.com",
	description: "Audigent is a first-party data platform that curates and activates audience data while providing identity solutions for targeting, measurement, and data interoperability.",
	icon: "Audigent.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "audigent:jsGlobal:0",
			kind: "jsGlobal",
			property: "audigentLogic",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
