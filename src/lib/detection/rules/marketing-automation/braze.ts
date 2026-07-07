import type { TechnologyDefinition } from '../../types';

export const brazeTechnologyDefinition = {
	id: "braze",
	name: "Braze",
	website: "https://www.braze.com",
	description: "Braze is a customer engagement platform that delivers messaging experiences across push, email, in-product, and more.",
	icon: "Braze.svg",
	categories: [
		"marketing-automation",
		"analytics",
	],
	rules: [
		{
			id: "braze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.appboycdn\\.com\\/web-sdk\\/([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "braze:jsGlobal:1",
			kind: "jsGlobal",
			property: "appboy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "braze:jsGlobal:2",
			kind: "jsGlobal",
			property: "appboyQueue",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "braze:jsGlobal:3",
			kind: "jsGlobal",
			property: "braze.BrazeSdkMetadata",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "braze:jsGlobal:4",
			kind: "jsGlobal",
			property: "brazeQueue",
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
