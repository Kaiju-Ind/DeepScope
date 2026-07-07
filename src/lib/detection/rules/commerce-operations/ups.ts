import type { TechnologyDefinition } from '../../types';

export const upsTechnologyDefinition = {
	id: "ups",
	name: "UPS",
	website: "https://www.ups.com",
	description: "UPS is an American multinational shipping & receiving and supply chain management company.",
	icon: "UPS.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "ups:text:0",
			kind: "text",
			pattern: new RegExp("\\b(?<!-)UPS\\b"),
			confidence: 25,
			description: "Page text mentions UPS; this is corroborating evidence only.",
		},
		{
			id: "ups:resourceUrl:owned-host",
			kind: "resourceUrl",
			pattern: new RegExp("https?://[^\\s\"'<>/]*(?:ups\\.com|ups\\.com\\.cdn\\.cloudflare\\.net)/", "i"),
			confidence: 85,
			description: "Loaded resource URL uses a UPS-owned host.",
		},
	],
} as const satisfies TechnologyDefinition;
