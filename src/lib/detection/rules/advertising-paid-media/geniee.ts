import type { TechnologyDefinition } from '../../types';

export const genieeTechnologyDefinition = {
	id: "geniee",
	name: "Geniee",
	website: "https://geniee.co.jp",
	description: "Geniee is an ad technology company.",
	icon: "Geniee.png",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "geniee:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.gsspcln\\.jp\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "geniee:dom:1",
			kind: "dom",
			selector: "img[src*='.gssprt.jp/'], link[href*='.gssprt.jp']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
