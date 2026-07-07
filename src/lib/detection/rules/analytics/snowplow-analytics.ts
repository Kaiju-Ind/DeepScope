import type { TechnologyDefinition } from '../../types';

export const snowplowAnalyticsTechnologyDefinition = {
	id: "snowplow-analytics",
	name: "Snowplow Analytics",
	website: "https://snowplowanalytics.com",
	description: "Snowplow is an open-source behavioral data management platform for businesses.",
	icon: "Snowplow.svg",
	categories: [
		"analytics",
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "snowplow-analytics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sp\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("d1fc8wv8zag5ca\\.cloudfront\\.net\\/.+\\/sp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/gh\\/snowplow\\/sp-js-assets@(?:.+)\\/sp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com\\/ajax\\/libs\\/snowplow\\/(?:.+)\\/sp.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:scriptSrc:4",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg.com\\/@snowplow\\/javascript-tracker@(?:.+)\\/dist\\/sp.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:scriptSrc:5",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.jsdelivr\\.net\\/npm\\/@snowplow\\/javascript-tracker@(?:.+)\\/dist\\/sp\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:jsGlobal:6",
			kind: "jsGlobal",
			property: "GlobalSnowplowNamespace",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:jsGlobal:7",
			kind: "jsGlobal",
			property: "Snowplow",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:cookie:8",
			kind: "cookie",
			keyPattern: new RegExp("^_sp_id$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "snowplow-analytics:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^sp$", "i"),
			confidence: 50,
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
