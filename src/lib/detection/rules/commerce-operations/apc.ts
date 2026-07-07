import type { TechnologyDefinition } from '../../types';

export const apcTechnologyDefinition = {
	id: "apc",
	name: "APC",
	website: "https://www.apc-pli.com",
	description: "APC offers door-to-door parcel and mail delivery.",
	icon: "APC.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "apc:text:0",
			kind: "text",
			pattern: new RegExp("\\bAPC\\b"),
			confidence: 25,
			description: "Page text mentions APC; this is corroborating evidence only.",
		},
		{
			id: "apc:resourceUrl:owned-host",
			kind: "resourceUrl",
			pattern: new RegExp("https?://[^\\s\"'<>/]*(?:apc-pli|apc-overnight)\\.[^\\s\"'<>/]+/", "i"),
			confidence: 85,
			description: "Loaded resource URL uses an APC delivery host.",
		},
	],
} as const satisfies TechnologyDefinition;
