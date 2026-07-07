import type { TechnologyDefinition } from '../../types';

export const incapsulaTechnologyDefinition = {
	id: "incapsula",
	name: "Incapsula",
	website: "https://www.incapsula.com",
	description: "Incapsula is a cloud-based application delivery platform. It uses a global content delivery network to provide web application security, DDoS mitigation, content caching, application delivery, load balancing and failover services.",
	icon: "Incapsula.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "incapsula:header:0",
			kind: "header",
			key: "X-CDN",
			valuePattern: new RegExp("Incapsula", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "incapsula:header:1",
			kind: "header",
			key: "x-cdn",
			valuePattern: new RegExp("incapsula", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
