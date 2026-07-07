import type { TechnologyDefinition } from '../../types';

export const stockistTechnologyDefinition = {
	id: "stockist",
	name: "Stockist",
	website: "https://stockist.co",
	description: "Stockist is a tool that adds a searchable store locator to a website, enabling visitors to find nearby retail locations through map-based search and filtering.",
	icon: "Stockist.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "stockist:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("stockist\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "stockist:jsGlobal:1",
			kind: "jsGlobal",
			property: "Stockist.loaded",
			description: "Page-owned global matches a known technology marker.",
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
