import type { TechnologyDefinition } from '../../types';

export const keloncloudTechnologyDefinition = {
	id: "keloncloud",
	name: "KelonCloud",
	website: "https://www.keloncloud.com",
	description: "KelonCloud offers a variety of cloud-based services, such as CDN, DDoS mitigation, cloud security, streaming, cloud compute, and more.",
	icon: "KelonCloud.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "keloncloud:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:(?:KelonCloud|KC)-Private-CDN|KelonCloud)$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "keloncloud:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^(?:(?:keloncloud|kc)-private-cdn|keloncloud)$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
