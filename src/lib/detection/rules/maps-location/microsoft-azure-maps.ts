import type { TechnologyDefinition } from '../../types';

export const microsoftAzureMapsTechnologyDefinition = {
	id: "microsoft-azure-maps",
	name: "Microsoft Azure Maps",
	website: "https://azure.microsoft.com/en-us/products/azure-maps/",
	description: "Microsoft Azure Maps is a cloud-based mapping and geospatial platform provided by Microsoft.",
	icon: "Microsoft.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "microsoft-azure-maps:meta:0",
			kind: "meta",
			key: "enabled-features",
			valuePattern: new RegExp("GEOJSON_AZURE_MAPS", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "microsoft-azure-maps:meta:1",
			kind: "meta",
			key: "enabled-features",
			valuePattern: new RegExp("geojson_azure_maps", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
	implies: [
		"azure",
	],
} as const satisfies TechnologyDefinition;
