import type { TechnologyDefinition } from '../../types';

export const maplineTechnologyDefinition = {
	id: "mapline",
	name: "Mapline",
	website: "https://mapline.com",
	description: "Mapline is a geo-powered analytics platform designed to deliver location-based insights worldwide.",
	icon: "Mapline.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "mapline:dom:0",
			kind: "dom",
			selector: "iframe[src*='app.mapline.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "mapline:header:1",
			kind: "header",
			key: "Access-Control-Allow-Origin",
			valuePattern: new RegExp("app\\.mapline\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "mapline:header:2",
			kind: "header",
			key: "access-control-allow-origin",
			valuePattern: new RegExp("app\\.mapline\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
