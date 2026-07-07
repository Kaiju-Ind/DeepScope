import type { TechnologyDefinition } from '../../types';

export const openstreetmapTechnologyDefinition = {
	id: "openstreetmap",
	name: "OpenStreetMap",
	website: "https://www.openstreetmap.org",
	description: "OpenStreetMap is a free, editable map of the whole world that is being built by volunteers largely from scratch and released with an open-content license.",
	icon: "OpenStreetMap.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "openstreetmap:dom:0",
			kind: "dom",
			selector: "iframe[src*='openstreetmap.org'],iframe[data-lazy-src*='openstreetmap.org']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:openstreetmap:openstreetmap:*:*:*:*:*:wordpress:*:*",
	},
} as const satisfies TechnologyDefinition;
