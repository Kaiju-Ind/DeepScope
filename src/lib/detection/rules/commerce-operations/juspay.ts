import type { TechnologyDefinition } from '../../types';

export const juspayTechnologyDefinition = {
	id: "juspay",
	name: "Juspay",
	website: "https://juspay.in",
	description: "Juspay is a developer of an online platform designed to be used for mobile-based payments.",
	icon: "juspay.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "juspay:jsGlobal:0",
			kind: "jsGlobal",
			property: "Juspay",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
