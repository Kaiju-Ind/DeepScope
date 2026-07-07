import type { TechnologyDefinition } from '../../types';

export const marketoTechnologyDefinition = {
	id: "marketo",
	name: "Marketo",
	website: "https://www.marketo.com",
	description: "Marketo develops and sells marketing automation software for account-based marketing and other marketing services and products including SEO and content creation.",
	icon: "Marketo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "marketo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("munchkin\\.marketo\\.\\w+\\/(?:([\\d.]+)\\/)?munchkin\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "marketo:jsGlobal:1",
			kind: "jsGlobal",
			property: "Munchkin",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "marketo:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^_mkto_trk$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
