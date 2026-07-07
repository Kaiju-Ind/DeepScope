import type { TechnologyDefinition } from '../../types';

export const akamaiConnectedCloudTechnologyDefinition = {
	id: "akamai-connected-cloud",
	name: "Akamai Connected Cloud",
	website: "https://www.akamai.com/solutions/cloud-computing",
	description: "Akamai Connected Cloud is a distributed cloud platform that combines core compute, edge services, and security to run applications at global scale.",
	icon: "Akamai.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "akamai-connected-cloud:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^volt-adc$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		pricing: [
			"payg",
			"recurring",
		],
	},
	implies: [
		"akamai",
	],
} as const satisfies TechnologyDefinition;
