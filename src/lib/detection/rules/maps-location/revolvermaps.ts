import type { TechnologyDefinition } from '../../types';

export const revolvermapsTechnologyDefinition = {
	id: "revolvermaps",
	name: "RevolverMaps",
	website: "https://www.revolvermaps.com",
	description: "RevolverMaps is a collection of real-time visitor statistics widgets for website or blog. Interactive visitor mappings to a globe rendered by the Revolver Engine.",
	icon: "RevolverMaps.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "revolvermaps:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.revolvermaps\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
