import type { TechnologyDefinition } from '../../types';

export const azureFrontDoorTechnologyDefinition = {
	id: "azure-front-door",
	name: "Azure Front Door",
	website: "https://docs.microsoft.com/en-us/azure/frontdoor/",
	description: "Azure Front Door is a scalable and secure entry point for fast delivery of your global web applications.",
	icon: "Azure.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "azure-front-door:cookie:0",
			kind: "cookie",
			keyPattern: new RegExp("^ASLBSA$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure-front-door:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ASLBSACORS$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure-front-door:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^aslbsa$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "azure-front-door:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^aslbsacors$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	implies: [
		"azure",
	],
} as const satisfies TechnologyDefinition;
