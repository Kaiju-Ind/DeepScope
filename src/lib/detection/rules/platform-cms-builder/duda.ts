import type { TechnologyDefinition } from '../../types';

export const dudaTechnologyDefinition = {
	id: "duda",
	name: "Duda",
	website: "https://www.duda.co/website-builder",
	description: "Duda is a user-friendly website builder and CMS platform that enables businesses and individuals to create responsive, mobile-friendly websites without extensive coding knowledge.",
	icon: "duda.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "duda:jsGlobal:0",
			kind: "jsGlobal",
			property: "SystemID",
			valuePattern: new RegExp("^.*DIRECT.*$"),
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "duda:jsGlobal:1",
			kind: "jsGlobal",
			property: "d_version",
			valuePattern: new RegExp("^(.*)$"),
			confidence: 0,
			version: {
				source: "match",
				template: "$1\\",
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "duda:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("dd-cdn\\.multiscreensite\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "duda:jsGlobal:3",
			kind: "jsGlobal",
			property: "SystemID",
			valuePattern: new RegExp("^.*(?:DIRECT|EU_PRODUCTION).*$"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
