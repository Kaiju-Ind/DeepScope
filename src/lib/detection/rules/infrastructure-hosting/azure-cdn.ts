import type { TechnologyDefinition } from '../../types';

export const azureCdnTechnologyDefinition = {
	id: "azure-cdn",
	name: "Azure CDN",
	website: "https://azure.microsoft.com/en-us/services/cdn/",
	description: "Azure Content Delivery Network (CDN) reduces load times, save bandwidth and speed responsiveness.",
	icon: "Azure.svg",
	categories: [
		"infrastructure-hosting",
		"server-runtime-infra",
	],
	rules: [
		{
			id: "azure-cdn:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:ECAcc|ECS|ECD)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "azure-cdn:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:ecacc|ecs|ecd)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	implies: [
		"azure",
	],
} as const satisfies TechnologyDefinition;
