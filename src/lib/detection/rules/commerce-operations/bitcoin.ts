import type { TechnologyDefinition } from '../../types';

export const bitcoinTechnologyDefinition = {
	id: "bitcoin",
	name: "Bitcoin",
	website: "https://en.wikipedia.org/wiki/Bitcoin",
	description: "Bitcoin is a decentralized digital currency, without a central bank or single administrator, that can be sent from user to user on the peer-to-peer bitcoin network without the need for intermediaries.",
	icon: "Bitcoin.svg",
	categories: [
		"commerce-operations",
	],
	rules: [
		{
			id: "bitcoin:dom:0",
			kind: "dom",
			selector: "[aria-labelledby='pi-bitcoin']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:bitcoin:bitcoin:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
