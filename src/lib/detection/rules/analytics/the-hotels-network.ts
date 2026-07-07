import type { TechnologyDefinition } from '../../types';

export const theHotelsNetworkTechnologyDefinition = {
	id: "the-hotels-network",
	name: "The Hotels Network",
	website: "https://thehotelsnetwork.com",
	description: "The Hotels Network provides a SaaS software that enhances hotelier websites with predictive marketing personalisation and user behavior analytics.",
	icon: "The Hotels Network.svg",
	categories: [
		"analytics",
		"experimentation-optimization",
	],
	rules: [
		{
			id: "the-hotels-network:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.thehotelsnetwork\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "the-hotels-network:jsGlobal:1",
			kind: "jsGlobal",
			property: "thn.data.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "the-hotels-network:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.thehotelsnetwork\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "the-hotels-network:header:3",
			kind: "header",
			key: "content-security-policy-report-only",
			valuePattern: new RegExp("\\.thehotelsnetwork\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
