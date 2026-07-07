import type { TechnologyDefinition } from '../../types';

export const criteoTechnologyDefinition = {
	id: "criteo",
	name: "Criteo",
	website: "https://criteo.com",
	description: "Criteo provides personalised retargeting that works with Internet retailers to serve personalised online display advertisements to consumers who have previously visited the advertiser's website.",
	icon: "Criteo.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "criteo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/(?:cas\\.criteo\\.com|(?:[^/]\\.)?criteo\\.net)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "criteo:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/\\/static\\.criteo\\.net\\/js\\/ld\\/ld\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "criteo:dom:2",
			kind: "dom",
			selector: "link[href*='.criteo.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "criteo:jsGlobal:3",
			kind: "jsGlobal",
			property: "Criteo",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "criteo:jsGlobal:4",
			kind: "jsGlobal",
			property: "criteo_pubtag",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "criteo:jsGlobal:5",
			kind: "jsGlobal",
			property: "criteo_q",
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
