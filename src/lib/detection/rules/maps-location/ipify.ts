import type { TechnologyDefinition } from '../../types';

export const ipifyTechnologyDefinition = {
	id: "ipify",
	name: "ipify",
	website: "https://ipify.org",
	description: "ipify is a service which provide public IP address API, IP geolocation API, VPN and Proxy detection API products.",
	icon: "ipify.png",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipify:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.ipify\\.org"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ipify:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("(?:api|api64|geo)\\.ipify\\.org"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
