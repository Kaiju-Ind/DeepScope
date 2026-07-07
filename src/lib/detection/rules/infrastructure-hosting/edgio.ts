import type { TechnologyDefinition } from '../../types';

export const edgioTechnologyDefinition = {
	id: "edgio",
	name: "Edgio",
	website: "https://edg.io",
	description: "Edgio was a developer-focused edge platform offering delivery and compute features via Layer0, now discontinued and partially absorbed by Akamai.",
	icon: "Edgio.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "edgio:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/__layer0__\\/cache-manifest\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "edgio:jsGlobal:1",
			kind: "jsGlobal",
			property: "Layer0.Metrics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "edgio:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^layer0_bucket$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "edgio:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^layer0_destination$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "edgio:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^layer0_eid$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "edgio:header:5",
			kind: "header",
			key: "x-0-version",
			valuePattern: new RegExp("^\\d+ ([\\d.]+) ", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
