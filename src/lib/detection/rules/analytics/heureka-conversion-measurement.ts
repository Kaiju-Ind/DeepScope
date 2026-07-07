import type { TechnologyDefinition } from '../../types';

export const heurekaConversionMeasurementTechnologyDefinition = {
	id: "heureka-conversion-measurement",
	name: "Heureka Conversion Measurement",
	website: "https://www.heureka.cz",
	description: "Heureka Conversion Measurement is a conversion tracking service from the Heureka shopping-comparison network.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "heureka-conversion-measurement:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ssl\\.heureka\\.cz\\/direct\\/i\\/gjs\\.php\\?n=wdgt"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "heureka-conversion-measurement:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("www\\.(?:heureka\\.(?:cz|sk)|arukereso\\.hu)\\/ocm\\/sdk\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
