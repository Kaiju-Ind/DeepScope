import type { TechnologyDefinition } from '../../types';

export const styliticsTechnologyDefinition = {
	id: "stylitics",
	name: "Stylitics",
	website: "https://stylitics.com",
	description: "Stylitics is a cloud-based SaaS platform for retailers to automate and distribute visual content at scale.",
	icon: "Stylitics.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "stylitics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.stylitics\\.com\\/v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stylitics:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/stylitics\\/js\\/stylitics\\.js\\?ver=v([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "stylitics:dom:2",
			kind: "dom",
			selector: "link[href*='.stylitics.com']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "stylitics:jsGlobal:3",
			kind: "jsGlobal",
			property: "Stylitics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "stylitics:jsGlobal:4",
			kind: "jsGlobal",
			property: "stylitics",
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
