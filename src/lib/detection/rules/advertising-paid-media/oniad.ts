import type { TechnologyDefinition } from '../../types';

export const oniadTechnologyDefinition = {
	id: "oniad",
	name: "ONiAD",
	website: "https://oniad.com",
	description: "ONiAd is a software platform that connects brands with their audience through omnichannel advertising.",
	icon: "ONiAD.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "oniad:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("track\\.oniad\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
