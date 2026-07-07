import type { TechnologyDefinition } from '../../types';

export const ddosGuardTechnologyDefinition = {
	id: "ddos-guard",
	name: "DDoS-Guard",
	website: "https://ddos-guard.net",
	description: "DDoS-Guard is a Russian Internet infrastructure company which provides DDoS protection, content delivery network services, and web hosting services.",
	icon: "DDoS-Guard.svg",
	categories: [
		"security",
	],
	rules: [
		{
			id: "ddos-guard:header:0",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^ddos-guard$", "i"),
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
