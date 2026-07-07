import type { TechnologyDefinition } from '../../types';

export const ushahidiTechnologyDefinition = {
	id: "ushahidi",
	name: "Ushahidi",
	website: "https://www.ushahidi.com",
	description: "Ushahidi is a tool that collects crowdsourced data and targeted survey responses from multiple data sources.",
	icon: "Ushahidi.png",
	categories: [
		"platform-cms-builder",
		"maps-location",
	],
	rules: [
		{
			id: "ushahidi:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/js\\/ushahidi\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ushahidi:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ushahidi",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ushahidi:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ushahidi$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ushahidi:ushahidi:*:*:*:*:*:*:*:*",
	},
	implies: [
		"mysql",
		"openlayers",
		"php",
	],
} as const satisfies TechnologyDefinition;
