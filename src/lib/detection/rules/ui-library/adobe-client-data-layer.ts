import type { TechnologyDefinition } from '../../types';

export const adobeClientDataLayerTechnologyDefinition = {
	id: "adobe-client-data-layer",
	name: "Adobe Client Data Layer",
	website: "https://github.com/adobe/adobe-client-data-layer",
	description: "Adobe Client Data Layer is a framework of JavaScript objects on your site that contains all variable values used in your implementation.",
	icon: "Adobe.svg",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "adobe-client-data-layer:jsGlobal:0",
			kind: "jsGlobal",
			property: "adobeDataLayer.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
