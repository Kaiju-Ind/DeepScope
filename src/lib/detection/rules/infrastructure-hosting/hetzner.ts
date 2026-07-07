import type { TechnologyDefinition } from '../../types';

export const hetznerTechnologyDefinition = {
	id: "hetzner",
	name: "Hetzner",
	website: "https://www.hetzner.com",
	description: "Hetzner provides dedicated hosting, shared web hosting, virtual private servers, managed servers, domain names, SSL certificates, storage boxes, and cloud.",
	icon: "Hetzner.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "hetzner:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("HeRay", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hetzner:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Hetzner", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hetzner:dns:2",
			kind: "dns",
			valuePattern: new RegExp("\\.ns\\.hetzner\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "hetzner:dns:3",
			kind: "dns",
			valuePattern: new RegExp("\\.hetzner\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "hetzner:header:4",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("heray", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "hetzner:header:5",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("hetzner", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
