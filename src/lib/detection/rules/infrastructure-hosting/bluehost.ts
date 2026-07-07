import type { TechnologyDefinition } from '../../types';

export const bluehostTechnologyDefinition = {
	id: "bluehost",
	name: "Bluehost",
	website: "https://www.bluehost.com",
	description: "Bluehost is a large web host known for its WordPress expertise, variety of “one-stop-shop” services, and bargain prices.",
	icon: "Bluehost.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "bluehost:header:0",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("c2hhcmVkLmJsdWVob3N0LmNvbQ==", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "bluehost:dns:1",
			kind: "dns",
			valuePattern: new RegExp("\\.bluehost\\.com", "i"),
			recordType: "NS",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "bluehost:dns:2",
			kind: "dns",
			valuePattern: new RegExp("\\.bluehost\\.com", "i"),
			recordType: "SOA",
			description: "DNS record matches a known technology marker.",
		},
		{
			id: "bluehost:header:3",
			kind: "header",
			key: "host-header",
			valuePattern: new RegExp("c2hhcmvklmjsdwvob3n0lmnvbq==", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
