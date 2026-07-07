import type { TechnologyDefinition } from '../../types';

export const arcgisApiForJavascriptTechnologyDefinition = {
	id: "arcgis-api-for-javascript",
	name: "ArcGIS API for JavaScript",
	website: "https://developers.arcgis.com/javascript/",
	description: "ArcGIS API for JavaScript is a tool used to embed maps and tasks in web applications.",
	icon: "arcgis_icon.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "arcgis-api-for-javascript:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.arcgis\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "arcgis-api-for-javascript:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("basemaps\\.arcgis\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
