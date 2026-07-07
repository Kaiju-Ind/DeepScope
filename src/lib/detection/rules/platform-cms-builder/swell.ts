import type { TechnologyDefinition } from '../../types';

export const swellTechnologyDefinition = {
	id: "swell",
	name: "Swell",
	website: "https://www.swell.is/",
	description: "Swell is a headless ecommerce platform for modern brands, startups, and agencies.",
	icon: "Swell.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "swell:html:0",
			kind: "html",
			pattern: new RegExp("<[^>]*swell\\.is"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "swell:html:1",
			kind: "html",
			pattern: new RegExp("<[^>]*swell\\.store"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "swell:html:2",
			kind: "html",
			pattern: new RegExp("<[^>]*schema\\.io"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "swell:jsGlobal:3",
			kind: "jsGlobal",
			property: "swell.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "swell:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^swell\\-session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "swell:dom:5",
			kind: "dom",
			selector: "img[srcset*='.swell.is'], img[srcset*='.swell.store'], img[srcset*='.schema.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "swell:jsGlobal:6",
			kind: "jsGlobal",
			property: "swell.version",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"mid",
			"recurring",
		],
	},
	excludes: [
		"shopify",
	],
} as const satisfies TechnologyDefinition;
