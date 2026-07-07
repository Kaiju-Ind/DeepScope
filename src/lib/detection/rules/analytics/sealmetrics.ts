import type { TechnologyDefinition } from '../../types';

export const sealmetricsTechnologyDefinition = {
	id: "sealmetrics",
	name: "SealMetrics",
	website: "https://sealmetrics.com",
	description: "SealMetrics is a cookieless analytics system that enables businesses to track website performance and user behaviour.",
	icon: "SealMetrics.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "sealmetrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sealmetrics\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sealmetrics:jsGlobal:1",
			kind: "jsGlobal",
			property: "sm.VERSION",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
