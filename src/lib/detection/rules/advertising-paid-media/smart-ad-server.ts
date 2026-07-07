import type { TechnologyDefinition } from '../../types';

export const smartAdServerTechnologyDefinition = {
	id: "smart-ad-server",
	name: "Smart Ad Server",
	website: "https://smartadserver.com",
	description: "Smart Ad Server is an adserving and RTB platform.",
	icon: "Smart Ad Server.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "smart-ad-server:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.sascdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "smart-ad-server:dom:1",
			kind: "dom",
			selector: "img[src*='smartadserver.com/'], link[href*='.smartadserver.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "smart-ad-server:jsGlobal:2",
			kind: "jsGlobal",
			property: "SmartAdServer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
