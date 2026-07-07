import type { TechnologyDefinition } from '../../types';

export const wunderkindTechnologyDefinition = {
	id: "wunderkind",
	name: "Wunderkind",
	website: "https://www.wunderkind.co",
	description: "Wunderkind (Formerly BounceX) is a software for behavioural marketing technologies, created to de-anonymise site visitors, analyse their digital behaviour and create relevant digital experiences regardless of channel or device.",
	icon: "Wunderkind.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "wunderkind:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.bounceexchange\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wunderkind:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\.smarterhq\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "wunderkind:dom:2",
			kind: "dom",
			selector: "link[href*='.smarterhq.io']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "wunderkind:jsGlobal:3",
			kind: "jsGlobal",
			property: "bouncex",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "wunderkind:header:4",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.smarterhq\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "wunderkind:header:5",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.smarterhq\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
