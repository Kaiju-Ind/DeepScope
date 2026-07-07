import type { TechnologyDefinition } from '../../types';

export const develicOmniumMapsTechnologyDefinition = {
	id: "develic-omnium-maps",
	name: "Develic Omnium Maps",
	website: "https://www.develic.com",
	description: "Develic Omnium Maps is a store locator application for Shopify stores designed to help users display and manage physical store locations.",
	icon: "Develic.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "develic-omnium-maps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("maps\\.develic\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "develic-omnium-maps:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("maps\\.develic\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
