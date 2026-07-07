import type { TechnologyDefinition } from '../../types';

export const sitegroundTechnologyDefinition = {
	id: "siteground",
	name: "SiteGround",
	website: "https://www.siteground.com",
	description: "SiteGround is a web hosting service.",
	icon: "siteground.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "siteground:header:0",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("192fc2e7e50945beb8231a492d6a8024|b7440e60b07ee7b8044761568fab26e8|624d5be7be38418a3e2a818cc8b7029b|6b7412fb82ca5edfd0917e3957f05d89", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "siteground:dns:1",
			kind: "dns",
			valuePattern: new RegExp("ns\\d+\\.c\\d+\\.sgvps\\.net", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "siteground:dns:2",
			kind: "dns",
			valuePattern: new RegExp("\\.siteground\\.net", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
