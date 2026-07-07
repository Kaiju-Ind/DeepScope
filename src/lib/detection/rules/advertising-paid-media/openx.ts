import type { TechnologyDefinition } from '../../types';

export const openxTechnologyDefinition = {
	id: "openx",
	name: "OpenX",
	website: "https://openx.com",
	description: "OpenX is a programmatic advertising technology company.",
	icon: "OpenX.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "openx:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/[^/]*\\.openx\\.net"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "openx:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("https?:\\/\\/[^/]*\\.servedbyopenx\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "openx:dom:2",
			kind: "dom",
			selector: "iframe[src*='.openx.net'], img[src*='.openx.net'], link[href*='.openx.net']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "openx:jsGlobal:3",
			kind: "jsGlobal",
			property: "openx.name",
			valuePattern: new RegExp("openx"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		cpe: "cpe:2.3:a:openx:openx:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
