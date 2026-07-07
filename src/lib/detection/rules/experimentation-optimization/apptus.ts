import type { TechnologyDefinition } from '../../types';

export const apptusTechnologyDefinition = {
	id: "apptus",
	name: "Apptus",
	website: "https://www.apptus.com",
	description: "Apptus is an AI-powered ecommerce optimisation software provider.",
	icon: "Apptus.svg",
	categories: [
		"experimentation-optimization",
	],
	rules: [
		{
			id: "apptus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.esales\\.apptus\\.com.+(?:apptus-esales-api-([\\d.]+))\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "apptus:jsGlobal:1",
			kind: "jsGlobal",
			property: "ApptusEsales",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apptus:jsGlobal:2",
			kind: "jsGlobal",
			property: "apptusConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apptus:jsGlobal:3",
			kind: "jsGlobal",
			property: "apptusDebug",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "apptus:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^apptus\\.customerKey$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "apptus:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^apptus\\.sessionKey$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "apptus:cookie:6",
			kind: "cookie",
			keyPattern: new RegExp("^apptus\\.customerkey$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "apptus:cookie:7",
			kind: "cookie",
			keyPattern: new RegExp("^apptus\\.sessionkey$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
