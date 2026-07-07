import type { TechnologyDefinition } from '../../types';

export const maxcdnTechnologyDefinition = {
	id: "maxcdn",
	name: "MaxCDN",
	website: "https://www.maxcdn.com",
	description: "MaxCDN is a content delivery network, which accelerates web-sites and decreases the server load.",
	icon: "MaxCDN.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "maxcdn:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^NetDNA", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "maxcdn:header:1",
			kind: "header",
			key: "X-CDN-Forward",
			valuePattern: new RegExp("^maxcdn$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "maxcdn:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^netdna", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "maxcdn:header:3",
			kind: "header",
			key: "x-cdn-forward",
			valuePattern: new RegExp("^maxcdn$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
