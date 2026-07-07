import type { TechnologyDefinition } from '../../types';

export const webhostukTechnologyDefinition = {
	id: "webhostuk",
	name: "WebHostUK",
	website: "https://www.webhostuk.co.uk",
	description: "WebHostUK is an UK based web hosting company offering cheap yet reliable and secure web hosting solutions on both Linux and Windows servers.",
	icon: "WebHostUK.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "webhostuk:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns2\\d\\.dnshostcentral\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "webhostuk:dns:1",
			kind: "dns",
			valuePattern: new RegExp("ns2\\d\\.dnshostcentral\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
