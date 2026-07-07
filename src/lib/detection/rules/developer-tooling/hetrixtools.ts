import type { TechnologyDefinition } from '../../types';

export const hetrixtoolsTechnologyDefinition = {
	id: "hetrixtools",
	name: "HetrixTools",
	website: "https://hetrixtools.com",
	description: "HetrixTools is an uptime and blacklist monitoring platform.",
	icon: "HetrixTools.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "hetrixtools:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.hetrixtools\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hetrixtools:jsGlobal:1",
			kind: "jsGlobal",
			property: "htoolz",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "hetrixtools:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.hetrixtools\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
