import type { TechnologyDefinition } from '../../types';

export const arubaItTechnologyDefinition = {
	id: "aruba-it",
	name: "Aruba.it",
	website: "https://www.aruba.it",
	description: "Aruba.it is an Italian company mainly active in the web hosting and domain registration businesses.",
	icon: "Aruba.it.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "aruba-it:header:0",
			kind: "header",
			key: "x-servername",
			valuePattern: new RegExp("\\.aruba\\.it", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "aruba-it:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.technorail\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
