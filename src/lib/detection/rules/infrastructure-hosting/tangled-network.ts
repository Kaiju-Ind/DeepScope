import type { TechnologyDefinition } from '../../types';

export const tangledNetworkTechnologyDefinition = {
	id: "tangled-network",
	name: "Tangled Network",
	website: "https://tanglednetwork.com",
	description: "Tangled Network provides a managed services in website devleopment, web and database hosting and domain registration, with a focus on everything managed for small and medium sized businesses.",
	icon: "atws.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "tangled-network:header:0",
			kind: "header",
			key: "X-Hosting-Provider",
			valuePattern: new RegExp("Tangled Network", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "tangled-network:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.tanglednetwork\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "tangled-network:dns:2",
			kind: "dns",
			valuePattern: new RegExp("\\.tanglednetwork\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "tangled-network:header:3",
			kind: "header",
			key: "x-hosting-provider",
			valuePattern: new RegExp("tangled network", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
