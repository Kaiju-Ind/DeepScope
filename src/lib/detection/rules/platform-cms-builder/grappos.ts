import type { TechnologyDefinition } from '../../types';

export const grapposTechnologyDefinition = {
	id: "grappos",
	name: "Grappos",
	website: "https://www.grappos.com/",
	description: "Grappos is a feature-rich product locator that helps users find products through structured search and location-based discovery.",
	icon: "Grappos.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "grappos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("locator\\.grappos\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "grappos:jsGlobal:1",
			kind: "jsGlobal",
			property: "grapposConfig.autoSearch",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "grappos:jsGlobal:2",
			kind: "jsGlobal",
			property: "grapposLoadLocator",
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
