import type { TechnologyDefinition } from '../../types';

export const ovhcloudTechnologyDefinition = {
	id: "ovhcloud",
	name: "OVHcloud",
	website: "https://www.ovhcloud.com",
	description: "OVHcloud is a global, cloud provider delivering hosted private cloud, public cloud, and dedicated server solutions.",
	icon: "OVHcloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "ovhcloud:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\d+\\.ovh\\.net", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "ovhcloud:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\d+\\.ovh\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
