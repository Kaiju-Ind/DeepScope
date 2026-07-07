import type { TechnologyDefinition } from '../../types';

export const technology5centscdnTechnologyDefinition = {
	id: "5centscdn",
	name: "5centsCDN",
	website: "https://www.5centscdn.net",
	description: "5centsCDN is a content delivery networks service provider.",
	icon: "5centsCDN.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "5centscdn:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.5centscdn\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "5centscdn:dom:1",
			kind: "dom",
			selector: "link[href*='.5centscdn.com/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "5centscdn:header:2",
			kind: "header",
			key: "x-cdn",
			valuePattern: new RegExp("^5centsCDN$", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "5centscdn:header:3",
			kind: "header",
			key: "x-cdn",
			valuePattern: new RegExp("^5centscdn$", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
