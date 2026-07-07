import type { TechnologyDefinition } from '../../types';

export const appnexusTechnologyDefinition = {
	id: "appnexus",
	name: "AppNexus",
	website: "https://appnexus.com",
	description: "AppNexus is a cloud-based software platform that enables and optimizes programmatic online advertising.",
	icon: "AppNexus.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "appnexus:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("adnxs\\.(?:net|com)"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "appnexus:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("prebid\\.adnxs\\.com"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "appnexus:dom:2",
			kind: "dom",
			selector: "iframe[src*='.adnxs.com'], img[src*='.adnxs.com'], link[href*='.adnxs.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "appnexus:jsGlobal:3",
			kind: "jsGlobal",
			property: "appnexus",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "appnexus:jsGlobal:4",
			kind: "jsGlobal",
			property: "appnexusVideo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
