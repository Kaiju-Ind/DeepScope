import type { TechnologyDefinition } from '../../types';

export const quicCloudTechnologyDefinition = {
	id: "quic-cloud",
	name: "QUIC.cloud",
	website: "https://www.quic.cloud",
	description: "QUIC.cloud is a content delivery network (CDN) and optimisation service that uses the QUIC protocol, a next-generation internet transport protocol developed by Google, to deliver content faster and more securely over the internet.",
	icon: "QUIC.cloud.svg",
	categories: [
		"monitoring-error-tracking",
		"server-runtime-infra",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "quic-cloud:dns:0",
			kind: "dns",
			valuePattern: new RegExp("\\.quicns\\.(?:net|com)", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
