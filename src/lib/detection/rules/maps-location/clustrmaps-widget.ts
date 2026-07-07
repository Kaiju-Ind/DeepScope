import type { TechnologyDefinition } from '../../types';

export const clustrmapsWidgetTechnologyDefinition = {
	id: "clustrmaps-widget",
	name: "ClustrMaps Widget",
	website: "https://clustrmaps.com/",
	description: "ClustrMaps widget is a visitor tracker, designed for general web and blog use.",
	icon: "ClustrMaps.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "clustrmaps-widget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("clustrmaps\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "clustrmaps-widget:dom:1",
			kind: "dom",
			selector: "img[src*='clustrmaps.com']",
			description: "DOM selector matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
