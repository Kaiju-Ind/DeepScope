import type { TechnologyDefinition } from '../../types';

export const hydraShieldTechnologyDefinition = {
	id: "hydra-shield",
	name: "Hydra-Shield",
	website: "https://hydra-shield.fr",
	description: "Hydra-Shield is an anti-DDoS protection reverse proxy that filters and mitigates malicious traffic to safeguard servers from distributed denial-of-service attacks.",
	icon: "Hydra-Shield.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "hydra-shield:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^Hydra-Shield\\sV([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hydra-shield:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^hydra-shield\\sv([\\d\\.]+)$", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
