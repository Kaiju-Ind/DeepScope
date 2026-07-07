import type { TechnologyDefinition } from '../../types';

export const eagleviewTechnologyDefinition = {
	id: "eagleview",
	name: "EagleView",
	website: "https://www.eagleview.com",
	description: "EagleView is a provider of GIS mapping, aerial imagery tools, and analytics used to deliver accurate geospatial data.",
	icon: "Eagleview.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "eagleview:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.eagleview\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
