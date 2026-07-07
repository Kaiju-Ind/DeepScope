import type { TechnologyDefinition } from '../../types';

export const serviceProviderProTechnologyDefinition = {
	id: "service-provider-pro",
	name: "Service Provider Pro",
	website: "https://spp.co",
	description: "Service Provider Pro is a client management & billing software for productized service agencies.",
	icon: "Service Provider Pro.svg",
	categories: [
		"commerce-operations",
		"business-tools",
	],
	rules: [
		{
			id: "service-provider-pro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\/spp_clients\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "service-provider-pro:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.spp\\.io\\/js\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "service-provider-pro:jsGlobal:2",
			kind: "jsGlobal",
			property: "sppOrderform",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "service-provider-pro:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^spp_csrf$", "i"),
			confidence: 25,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "service-provider-pro:cookie:4",
			kind: "cookie",
			keyPattern: new RegExp("^spp_orderform$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "service-provider-pro:cookie:5",
			kind: "cookie",
			keyPattern: new RegExp("^spp_session$", "i"),
			confidence: 25,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "service-provider-pro:meta:6",
			kind: "meta",
			key: "server",
			valuePattern: new RegExp("app.spp.co", "i"),
			description: "Meta tag matches a known technology marker.",
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
