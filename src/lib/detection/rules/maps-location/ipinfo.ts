import type { TechnologyDefinition } from '../../types';

export const ipinfoTechnologyDefinition = {
	id: "ipinfo",
	name: "IPinfo",
	website: "https://ipinfo.io",
	description: "IPinfo is an IP address data provider.",
	icon: "IPinfo.svg",
	categories: [
		"maps-location",
	],
	rules: [
		{
			id: "ipinfo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("ipinfo\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ipinfo:requestUrl:1",
			kind: "requestUrl",
			pattern: new RegExp("ipinfo\\.io\\/"),
			description: "Observed request URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
