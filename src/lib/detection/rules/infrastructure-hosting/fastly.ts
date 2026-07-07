import type { TechnologyDefinition } from '../../types';

export const fastlyTechnologyDefinition = {
	id: "fastly",
	name: "Fastly",
	website: "https://www.fastly.com",
	description: "Fastly is a cloud computing services provider. Fastly's cloud platform provides a content delivery network, Internet security services, load balancing, and video & streaming services.",
	icon: "Fastly.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "fastly:requestUrl:0",
			kind: "requestUrl",
			pattern: new RegExp("\\.fastly\\.net"),
			description: "Observed request URL matches a known technology marker.",
		},
		{
			id: "fastly:header:1",
			kind: "header",
			key: "Vary",
			valuePattern: new RegExp("Fastly-SSL", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fastly:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("Fastly", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fastly:header:3",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("fastly", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "fastly:header:4",
			kind: "header",
			key: "vary",
			valuePattern: new RegExp("fastly-ssl", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
		],
		cpe: "cpe:2.3:a:fastly:fastly:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
