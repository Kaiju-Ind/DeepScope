import type { TechnologyDefinition } from '../../types';

export const gotipathTechnologyDefinition = {
	id: "gotipath",
	name: "GotiPath",
	website: "https://gotipath.com",
	description: "GotiPath is a content delivery network (CDN) provider that is associated with telecom giant Telekom Malaysia Berhad.",
	icon: "GotiPath.png",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "gotipath:dom:0",
			kind: "dom",
			selector: "img[src*='.gotipath.com/'], link[href*='.gpcdn.net/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "gotipath:header:1",
			kind: "header",
			key: "X-Cache",
			valuePattern: new RegExp("\\.swiftserve\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "gotipath:header:2",
			kind: "header",
			key: "x-cache",
			valuePattern: new RegExp("\\.swiftserve\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"payg",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
