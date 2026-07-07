import type { TechnologyDefinition } from '../../types';

export const idcloudhostTechnologyDefinition = {
	id: "idcloudhost",
	name: "idCloudHost",
	website: "https://idcloudhost.com",
	description: "idCloudHost is a local web service provider based in Indonesia that offer a wide range of services including domain name registration and cloud hosting.",
	icon: "idCloudHost.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "idcloudhost:dns:0",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.cloudhost\\.id", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "idcloudhost:dns:1",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.cloudhost\\.id", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
